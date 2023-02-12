import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import GameGuideModal from "./GameGuideModal";
import CatchMindModal from "./CatchMindModal";
import ChattingGuideModal from "./ChattingGuideModal";
import ImageGameGuideModal from "./ImageGameGuideModal";
import LotteryGuideModal from "./LotteryGuideModal";
import PersonQuizGuideModal from "./PersonQuizGuideModal";
import PhotoGuideModal from "./PhotoGuideModal";
import ShoutInSilenceGuideModal from "./ShoutInSilenceGuideModal";
import styles from "./Modal.module.css";

const GuideModalFrame = ({ show, closeModal, nowContent }) => {
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
    window.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );
  }, [nowContent]);

  const nextGuide = () => {
    if (modalContent < 7) {
      setModalContent(modalContent + 1);
    }
  };
  const prevGuide = () => {
    if (modalContent > 0) {
      setModalContent(modalContent - 1);
    }
  };

  let fadeAnimationClass = fadeAnimation.join(" ");
  let slideAnimationClass = slide.join(" ");

  return (
    <div className={styles[fadeAnimationClass]}>
      <div
        className={styles.gameGuide}
        id={styles.outside}
        onClick={closeModal}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <FaChevronLeft onClick={prevGuide} className={styles.leftArrow} />
          <FaChevronRight onClick={nextGuide} className={styles.rightArrow} />
        </div>
        <div
          className={`${styles[slideAnimationClass]} ${styles.modalcontainer}`}
          onClick={(e) => e.stopPropagation()}
        >
          {modalContent === 0 && <GameGuideModal closeModal={closeModal} />}
          {modalContent === 1 && <PhotoGuideModal closeModal={closeModal} />}
          {modalContent === 2 && <ChattingGuideModal closeModal={closeModal} />}
          {modalContent === 3 && (
            <ImageGameGuideModal closeModal={closeModal} />
          )}
          {modalContent === 4 && <CatchMindModal closeModal={closeModal} />}
          {modalContent === 5 && (
            <ShoutInSilenceGuideModal closeModal={closeModal} />
          )}
          {modalContent === 6 && (
            <PersonQuizGuideModal closeModal={closeModal} />
          )}
          {modalContent === 7 && <LotteryGuideModal closeModal={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(GuideModalFrame);
