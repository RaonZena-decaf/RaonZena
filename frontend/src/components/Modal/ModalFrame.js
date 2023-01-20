import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import GameGuideModal from "../../components/Modal/GameGuideModal";
import CatchMindModal from "../../components/Modal/CatchMindModal";
import ChattingGuideModal from "../../components/Modal/ChattingGuideModal";
import ImageGameGuideModal from "../../components/Modal/ImageGameGuideModal";
import LotteryGuideModal from "../../components/Modal/LotteryGuideModal";
import PersonQuizGuideModal from "../../components/Modal/PersonQuizGuideModal";
import PhotoGuideModal from "../../components/Modal/PhotoGuideModal";
import ShoutInSilenceGuideModal from "../../components/Modal/ShoutInSilenceGuideModal";
import TreasureHuntGuideModal from "../../components/Modal/TreasureHuntGuideModal";
import "./Modal.css";


const ModalFrame = ({ show, closeModal }) => {
  // 스크롤 현재 상태로 고정 (오류 있음)
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const fadeAnimation = [show === 'entering'? "ModalOpen" : show === 'exiting' ? 'ModalClose':null]
  const slide = ['modalcontainer', show === 'entering'? "ModalSlideIn" : show === 'exiting' ? 'ModalSlideOut':null]
  const [modalContent, setModalContent] = useState (0)
  const nextGuide = () => {
    if (modalContent < 8) {
    setModalContent(modalContent+1)
    console.log(modalContent)
  }}
  const prevGuide = () => {
    if (modalContent > 0) {
    setModalContent(modalContent-1)
  }}

  return (
    <div className={fadeAnimation.join(' ')}>
      <div className="gameGuide" id="outside" onClick={closeModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <FaChevronLeft onClick={prevGuide} className="leftArrow"/>
          <FaChevronRight onClick={nextGuide} className="rightArrow"/>
        </div>
        <div className={slide.join(' ')} onClick={(e) => e.stopPropagation()}>
          {modalContent === 0 && <GameGuideModal closeModal={closeModal}/>}
          {modalContent === 1 && <PhotoGuideModal closeModal={closeModal}/>}
          {modalContent === 2 && <GameGuideModal closeModal={closeModal}/>}
          {modalContent === 3 && <GameGuideModal closeModal={closeModal}/>}
          {modalContent === 4 && <GameGuideModal closeModal={closeModal}/>}
          {modalContent === 5 && <GameGuideModal closeModal={closeModal}/>}
          {modalContent === 6 && <GameGuideModal closeModal={closeModal}/>}
          {modalContent === 7 && <GameGuideModal closeModal={closeModal}/>}
          {modalContent === 8 && <GameGuideModal closeModal={closeModal}/>}
        </div>
      </div>
    </div>
  );
};

export default ModalFrame