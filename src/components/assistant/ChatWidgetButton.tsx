import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useChatWidget } from '../../contexts/ChatWidgetContext';
import { COLORS } from '../../constants/colors';

/**
 * Botón flotante que abre el chat widget
 * Se muestra solo cuando el widget está cerrado
 */
const ChatWidgetButton: React.FC = () => {
  const { isOpen, setIsOpen } = useChatWidget();

  if (isOpen) return null;

  return (
    <button
      onClick={() => setIsOpen(true)}
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
        display: "flex",
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
      aria-label="Abrir asistente virtual"
      title="¿Necesitas ayuda? Chatea con nuestro asistente"
    >
      <MessageCircle size={24} aria-hidden="true" />
    </button>
  );
};

export default ChatWidgetButton;
