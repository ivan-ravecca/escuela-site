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

const RATE_LIMIT = 10; // mensajes por minuto
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto en ms
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo
const MAX_HISTORY_LENGTH = 20; // Máximo 20 mensajes en memoria
const STORAGE_KEY = 'assistant_conversation';

export const useAssistant = (): UseAssistantReturn => {
  // Cargar mensajes desde localStorage si existen
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convertir timestamps de string a Date
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
  
  // Tracking de rate limit
  const rateLimitRef = useRef<RateLimitTracker>({
    count: 0,
    resetTime: Date.now() + RATE_LIMIT_WINDOW,
  });

  // Verificar si estamos dentro del rate limit
  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const tracker = rateLimitRef.current;

    // Resetear contador si pasó la ventana de tiempo
    if (now >= tracker.resetTime) {
      tracker.count = 0;
      tracker.resetTime = now + RATE_LIMIT_WINDOW;
    }

    // Verificar si excedemos el límite
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

  // Función helper para retry con backoff exponencial
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

      // Esperar antes de reintentar (backoff exponencial)
      const delay = RETRY_DELAY * Math.pow(2, MAX_RETRIES - retries);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return retryWithBackoff(fn, retries - 1);
    }
  };

  // Persistir mensajes en localStorage cuando cambien
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (err) {
        console.error('Error saving conversation:', err);
      }
    }
  }, [messages]);

  // Cargar mensaje de bienvenida al montar (solo si no hay mensajes guardados)
  useEffect(() => {
    const loadWelcomeMessage = async () => {
      // No cargar si ya hay mensajes en el estado
      if (messages.length > 0) return;

      setIsLoading(true);
      setError(null);

      try {
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

  // Enviar mensaje del usuario
  const sendMessage = useCallback(
    async (messageContent: string): Promise<void> => {
      if (!messageContent.trim()) {
        setError("El mensaje no puede estar vacío");
        return;
      }

      // Verificar rate limit
      if (!checkRateLimit()) {
        return;
      }

      setIsLoading(true);
      setError(null);

      // Agregar mensaje del usuario inmediatamente
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: messageContent.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => {
        // Limitar a MAX_HISTORY_LENGTH mensajes
        const updated = [...prev, userMessage];
        if (updated.length > MAX_HISTORY_LENGTH) {
          // Mantener solo los últimos MAX_HISTORY_LENGTH mensajes
          return updated.slice(-MAX_HISTORY_LENGTH);
        }
        return updated;
      });

      try {
        // Construir historial de conversación (limitar a últimos 10 para el API)
        const recentMessages = messages.slice(-10);
        const conversationHistory: ConversationHistory[] = recentMessages.map(
          (msg) => ({
            role: msg.role,
            content: msg.content,
          })
        );

        // Agregar el mensaje actual al historial
        conversationHistory.push({
          role: "user",
          content: messageContent.trim(),
        });

        // Enviar al backend con retry logic
        const response = await retryWithBackoff(() =>
          AssistantService.sendMessage(messageContent.trim(), conversationHistory)
        );

        // Agregar respuesta del asistente
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response.response,
          timestamp: new Date(),
          recommendedCourses: response.recommended_courses,
        };

        setMessages((prev) => {
          // Limitar a MAX_HISTORY_LENGTH mensajes
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

        // Opcional: Remover el mensaje del usuario si falló completamente
        // setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      } finally {
        setIsLoading(false);
      }
    },
    [messages, checkRateLimit]
  );

  // Limpiar conversación
  const clearConversation = useCallback(async () => {
    setMessages([]);
    setError(null);
    setIsLoading(true);

    // Limpiar localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Error clearing storage:', err);
    }

    // Resetear rate limit al limpiar
    rateLimitRef.current = {
      count: 0,
      resetTime: Date.now() + RATE_LIMIT_WINDOW,
    };

    try {
      // Recargar mensaje de bienvenida
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

  // Solicitar que el asistente pida información de contacto para un curso específico
  const requestContactForCourse = useCallback((courseId: string, courseName: string) => {
    const contactMessage: Message = {
      id: `contact-request-${Date.now()}`,
      role: "assistant",
      content: `¡Excelente! Veo que te interesa el curso "${courseName}". Para que podamos ponernos en contacto contigo, necesito los siguientes datos:\n\n• Nombre completo\n• Teléfono\n• Email (opcional)\n\nPor favor, completa el formulario que aparece a continuación.`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, contactMessage]);
  }, []);

  // Agregar un mensaje del asistente sin llamar a la API
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
