import Modal from "react-modal";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

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
          width: "60%",
          maxWidth: "650px",
        },
      }}
    >
      {content}
    </Modal>
  );
};

export default CustomModal;
