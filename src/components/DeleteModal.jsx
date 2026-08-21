import styled from "styled-components";
import { motion } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 50%;
  width: 420px;
  height: 100vh;
  margin-left: -210px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;

  @media (max-width: 768px) {
    width: 100vw;
    left: 0;
    margin-left: 0;
  }
`;

const Dialog = styled(motion.div)`
  width: 300px;
  height: 136px;
  padding: 33px 28px;
  background: var(--modal);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 21px;
  box-shadow: var(--shadow);
`;

const Title = styled.p`
  font-size: 1.8rem;
  color: var(--stext);
  text-align: center;
  line-height: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

const ModalButton = styled.button`
  width: 100px;
  height: 36px;
  padding: 0;
  border-radius: 100px;
  font-size: 1.6rem;
  font-family: "RIDIBatang";
  color: var(--light);
  cursor: pointer;
  white-space: nowrap;
  background: ${({ $variant }) =>
    $variant === "delete" ? "var(--delete)" : "var(--cancel)"};
`;

const overlayTransition = {
  duration: 0.24,
  ease: [0.32, 0.72, 0, 1],
};

const dialogTransition = {
  duration: 0.28,
  ease: [0.32, 0.72, 0, 1],
};

const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
      onClick={onCancel}
    >
      <Dialog
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={dialogTransition}
        onClick={(e) => e.stopPropagation()}
      >
        <Title>삭제하시겠습니까?</Title>
        <ButtonRow>
          <ModalButton type="button" onClick={onCancel}>
            취소
          </ModalButton>
          <ModalButton type="button" $variant="delete" onClick={onConfirm}>
            삭제
          </ModalButton>
        </ButtonRow>
      </Dialog>
    </Overlay>
  );
};

export default DeleteModal;
