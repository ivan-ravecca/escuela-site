import Modal from "react-modal";

import { CustomModalProps } from "../data/interfaces";

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  content,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          zIndex: 1000,
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          width: "85%",
          maxWidth: "650px",
          overflowY: "auto",
          maxHeight: "90vh",
        },
      }}
    >
      {/* Botón de cierre solo visible en mobile */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "transparent",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
          zIndex: 1100,
          display: "block",
        }}
        className="modal-close-mobile"
        aria-label="Cerrar"
      >
        &times;
      </button>
      {content}
    </Modal>
  );
};

export default CustomModal;
