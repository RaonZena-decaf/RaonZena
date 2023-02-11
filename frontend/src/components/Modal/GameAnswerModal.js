import styles from "./GameAnswerModal.module.css";
import { useEffect } from "react";

export default function GameAnswerModal({ show, handleClose }) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const fadeAnimation = [
    show === "entering"
      ? "ModalOpen"
      : show === "exiting"
      ? "ModalClose"
      : null,
  ];
  const slide = [
    show === "entering"
      ? "ModalSlideIn"
      : show === "exiting"
      ? "ModalSlideOut"
      : null,
  ];

  return (
    <div
      className={`${styles.outside} ${styles[fadeAnimation]}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modalContainer} ${styles[slide]}`}
        onClick={(e) => e.stopPropagation()}
      >
        정답
      </div>
    </div>
  );
}
