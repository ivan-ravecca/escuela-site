import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { Message, LeadCaptureData } from "../../types/assistant";
import { AssistantService } from "../../services/AssistantService";
import CourseCard from "./CourseCard";
import LeadForm from "./LeadForm";
import { COLORS } from "../../constants/colors";
import "../../styles/chatWidget.scss";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      loadWelcomeMessage();
    }
  }, [isOpen]);

  const loadWelcomeMessage = async () => {
    try {
      const welcomeText = await AssistantService.getWelcomeMessage();
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: welcomeText,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error("Error loading welcome message:", error);
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
        timestamp: new Date(),
      };
      setMessages([fallbackMessage]);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await AssistantService.sendMessage(
        userMessage.content,
        conversationHistory
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.response,
        timestamp: new Date(),
        recommendedCourses: response.recommended_courses,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Detectar si el usuario quiere ser contactado
      const lowerContent = userMessage.content.toLowerCase();
      if (
        lowerContent.includes("contactar") ||
        lowerContent.includes("contacto") ||
        lowerContent.includes("llamar") ||
        lowerContent.includes("información") ||
        lowerContent.includes("interesa")
      ) {
        setShowLeadForm(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Disculpa, tuve un problema al procesar tu mensaje. ¿Podrías intentar nuevamente?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleLeadSubmit = async (data: LeadCaptureData) => {
    await AssistantService.captureInterest(data);
    setShowLeadForm(false);

    const confirmMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "¡Perfecto! Hemos recibido tu información. Nos comunicaremos contigo pronto para brindarte más detalles sobre nuestros cursos. 😊",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, confirmMessage]);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-widget-button"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          backgroundColor: COLORS.schoolGreenPrimary,
          color: COLORS.white,
          borderRadius: "50%",
          border: "none",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          cursor: "pointer",
          display: isOpen ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.schoolGreenHover;
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.schoolGreenPrimary;
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Abrir chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Ventana de chat */}
      <div
        className="chat-widget-window"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "384px",
          height: "512px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          zIndex: 9999,
          transformOrigin: "bottom right",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: `linear-gradient(to right, ${COLORS.schoolGreenPrimary}, ${COLORS.schoolGreenHover})`,
            color: COLORS.white,
            padding: "16px",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageCircle size={20} />
            <h3 style={{ fontWeight: "600", fontSize: "16px", margin: 0 }}>
              Asistente Virtual
            </h3>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              aria-label="Minimizar chat"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => {
                  setMessages([]);
                  setShowLeadForm(false);
                  setSelectedCourses([]);
                }, 300);
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Área de mensajes */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px",
            backgroundColor: COLORS.schoolGreenExtraLight,
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: "flex",
                justifyContent:
                  message.role === "user" ? "flex-end" : "flex-start",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  borderRadius: "8px",
                  padding: "12px",
                  backgroundColor:
                    message.role === "user" ? COLORS.schoolGreenPrimary : COLORS.white,
                  color: message.role === "user" ? COLORS.white : COLORS.textGray,
                  boxShadow:
                    message.role === "assistant"
                      ? "0 1px 3px rgba(0,0,0,0.1)"
                      : "none",
                  border:
                    message.role === "assistant"
                      ? `1px solid ${COLORS.shadowGray}`
                      : "none",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                    margin: 0,
                  }}
                >
                  {message.content}
                </p>
                {message.recommendedCourses &&
                  message.recommendedCourses.length > 0 && (
                    <div style={{ marginTop: "12px" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          color: COLORS.textLightGray,
                          marginBottom: "8px",
                        }}
                      >
                        Cursos recomendados:
                      </p>
                      {message.recommendedCourses.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onSelect={handleCourseSelect}
                        />
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
              <div
                style={{
                  backgroundColor: COLORS.white,
                  color: COLORS.textGray,
                  borderRadius: "8px",
                  padding: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: `1px solid ${COLORS.shadowGray}`,
                }}
              >
                <div style={{ display: "flex", gap: "4px" }}>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: COLORS.disabledGray,
                      borderRadius: "50%",
                      animation: "bounce 1s infinite",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: COLORS.disabledGray,
                      borderRadius: "50%",
                      animation: "bounce 1s infinite 0.1s",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: COLORS.disabledGray,
                      borderRadius: "50%",
                      animation: "bounce 1s infinite 0.2s",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {showLeadForm && (
            <LeadForm
              interestedCourses={selectedCourses}
              onSubmit={handleLeadSubmit}
              onCancel={() => setShowLeadForm(false)}
            />
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          style={{
            padding: "16px",
            borderTop: `1px solid ${COLORS.borderGray}`,
            backgroundColor: COLORS.white,
            borderRadius: "0 0 16px 16px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              style={{
                flex: 1,
                padding: "8px 12px",
                border: `1px solid ${COLORS.borderLightGray}`,
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = COLORS.schoolGreenPrimary;
                e.target.style.boxShadow = "0 0 0 2px rgba(46,139,87,0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = COLORS.borderLightGray;
                e.target.style.boxShadow = "none";
              }}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{
                backgroundColor: !inputValue.trim() || isTyping ? COLORS.disabledGray : COLORS.schoolGreenPrimary,
                color: COLORS.white,
                padding: "8px",
                borderRadius: "8px",
                border: "none",
                cursor: !inputValue.trim() || isTyping ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim() && !isTyping) {
                  e.currentTarget.style.backgroundColor = COLORS.schoolGreenHover;
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim() && !isTyping) {
                  e.currentTarget.style.backgroundColor = COLORS.schoolGreenPrimary;
                }
              }}
              aria-label="Enviar mensaje"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
