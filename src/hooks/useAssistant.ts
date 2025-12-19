import { useState, useEffect, useCallback, useRef } from "react";
import { AssistantService } from "../services/AssistantService";
import { Message, ConversationHistory } from "../types/assistant";

interface UseAssistantReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearConversation: () => void;
  requestContactForCourse: (courseId: string, courseName: string) => void;
  addAssistantMessage: (content: string) => void;
}

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

const RATE_LIMIT = 10; // messages per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const MAX_HISTORY_LENGTH = 20; // Maximum 20 messages in memory
const STORAGE_KEY = 'assistant_conversation';

export const useAssistant = (): UseAssistantReturn => {
  // Load messages from localStorage if they exist
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamps from string to Date
        return parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      }
    } catch (err) {
      console.error('Error loading stored conversation:', err);
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Rate limit tracking
  const rateLimitRef = useRef<RateLimitTracker>({
    count: 0,
    resetTime: Date.now() + RATE_LIMIT_WINDOW,
  });

  // Check if within rate limit
  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const tracker = rateLimitRef.current;

    // Reset counter if time window passed
    if (now >= tracker.resetTime) {
      tracker.count = 0;
      tracker.resetTime = now + RATE_LIMIT_WINDOW;
    }

    // Check if limit exceeded
    if (tracker.count >= RATE_LIMIT) {
      const waitTime = Math.ceil((tracker.resetTime - now) / 1000);
      setError(
        `Has alcanzado el límite de ${RATE_LIMIT} mensajes por minuto. Por favor, espera ${waitTime} segundos.`
      );
      return false;
    }

    tracker.count++;
    return true;
  }, []);

  // Helper function to retry with exponential backoff
  const retryWithBackoff = async <T,>(
    fn: () => Promise<T>,
    retries: number = MAX_RETRIES
  ): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      if (retries <= 0) {
        throw err;
      }

      // Wait before retrying (exponential backoff)
      const delay = RETRY_DELAY * Math.pow(2, MAX_RETRIES - retries);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return retryWithBackoff(fn, retries - 1);
    }
  };

  // Persist messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (err) {
        console.error('Error saving conversation:', err);
      }
    }
  }, [messages]);

  // Load welcome message on mount (only if no saved messages)
  useEffect(() => {
    const loadWelcomeMessage = async () => {
      // Do not load if messages already exist in state
      if (messages.length > 0) return;

      setIsLoading(true);
      setError(null);

      try {
        // 1. Initialize CSRF token first
        await retryWithBackoff(() =>
          AssistantService.initializeCSRF()
        );
        
        // 2. Then fetch welcome message
        const welcomeText = await retryWithBackoff(() =>
          AssistantService.getWelcomeMessage()
        );

        const welcomeMessage: Message = {
          id: `welcome-${Date.now()}`,
          role: "assistant",
          content: welcomeText,
          timestamp: new Date(),
        };

        setMessages([welcomeMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "No se pudo cargar el mensaje de bienvenida";
        setError(errorMessage);
        console.error("Error loading welcome message:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadWelcomeMessage();
  }, []);

  // Send user message
  const sendMessage = useCallback(
    async (messageContent: string): Promise<void> => {
      if (!messageContent.trim()) {
        setError("El mensaje no puede estar vacío");
        return;
      }

      // Check rate limit
      if (!checkRateLimit()) {
        return;
      }

      setIsLoading(true);
      setError(null);

      // Add user message immediately
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageContent.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => {
        // Limit to MAX_HISTORY_LENGTH messages
        const updated = [...prev, userMessage];
        if (updated.length > MAX_HISTORY_LENGTH) {
          // Keep only the last MAX_HISTORY_LENGTH messages
          return updated.slice(-MAX_HISTORY_LENGTH);
        }
        return updated;
      });

      try {
        // Build conversation history (limit to last 10 for API)
        const recentMessages = messages.slice(-10);
        const conversationHistory: ConversationHistory[] = recentMessages.map(
          (msg) => ({
            role: msg.role,
            content: msg.content,
          })
        );

        // Add current message to history
        conversationHistory.push({
          role: "user",
          content: messageContent.trim(),
        });

        // Send to backend with retry logic
        const response = await retryWithBackoff(() =>
          AssistantService.sendMessage(messageContent.trim(), conversationHistory)
        );

        // Add assistant response
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.response,
          timestamp: new Date(),
          recommendedCourses: response.recommended_courses,
        };

        setMessages((prev) => {
          // Limit to MAX_HISTORY_LENGTH messages
          const updated = [...prev, assistantMessage];
          if (updated.length > MAX_HISTORY_LENGTH) {
            return updated.slice(-MAX_HISTORY_LENGTH);
          }
          return updated;
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Error al enviar el mensaje. Por favor, intenta nuevamente.";
        setError(errorMessage);
        console.error("Error sending message:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, checkRateLimit]
  );

  // Clear conversation
  const clearConversation = useCallback(async () => {
    setMessages([]);
    setError(null);
    setIsLoading(true);

    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Error clearing storage:', err);
    }

    // Reset rate limit after clearing
    rateLimitRef.current = {
      count: 0,
      resetTime: Date.now() + RATE_LIMIT_WINDOW,
    };

    try {
      // Reinitialize CSRF token
      await retryWithBackoff(() =>
        AssistantService.initializeCSRF()
      );
      
      // Reload welcome message
      const welcomeText = await retryWithBackoff(() =>
        AssistantService.getWelcomeMessage()
      );

      const welcomeMessage: Message = {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: welcomeText,
        timestamp: new Date(),
      };

      setMessages([welcomeMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "No se pudo recargar el mensaje de bienvenida";
      setError(errorMessage);
      console.error("Error reloading welcome message:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Ask the assistant to request contact details for a specific course
  const requestContactForCourse = useCallback((courseId: string, courseName: string) => {
    // Mark parameter as used to satisfy TS no-unused-parameters
    void courseId;
    const contactMessage: Message = {
      id: `contact-request-${Date.now()}`,
      role: "assistant",
      content: `¡Excelente! Veo que te interesa el curso "${courseName}". Para que podamos ponernos en contacto contigo, necesito los siguientes datos:\n\n• Nombre completo\n• Teléfono\n• Email (opcional)\n\nPor favor, completa el formulario que aparece a continuación.`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, contactMessage]);
  }, []);

  // Add an assistant message without calling the API
  const addAssistantMessage = useCallback((content: string) => {
    const message: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, message]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearConversation,
    requestContactForCourse,
    addAssistantMessage,
  };
};
