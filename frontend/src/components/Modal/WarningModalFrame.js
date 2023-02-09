import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

const WarningModalFrame = ({ show, closeModal, nowContent }) => {
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
  const [modalContent, setModalContent] = useState(0);

  useEffect(() => {
    setModalContent(nowContent);
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
  }, [nowContent]);

  let fadeAnimationClass = fadeAnimation.join(" ");
  let slideAnimationClass = slide.join(" ");

  return (
    <div className={styles[fadeAnimationClass]}>
      <div
        className={styles.gameGuide}
        id={styles.outside}
        onClick={closeModal}
      >
        <div
          className={`${styles[slideAnimationClass]} ${styles.modalcontainer}`}
          onClick={(e) => e.stopPropagation()}
        >
          {modalContent === 0 && <div closeModal={closeModal} />}

        </div>
      </div>
    </div>
  );
};

export default React.memo(WarningModalFrame);
