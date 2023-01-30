import React, { useEffect, useState } from "react";
import styles from "./RoomMenuFrame.module.css";
import ChatingSubjectLoading from "./ChatingSubjectLoading.js"
import PhotoShoot from "./PhotoShoot.js"
import ChooseGame from "./ChooseGame.js"

const RoomMenuFrame = ({ show, closeMenu, nowContent }) => {
  const animation = [
    show === "entering"
      ? "MenuOpen"
      : show === "exiting"
      ? "MenuClose"
      : null,
  ];

  const slide = [
    show === "entering"
      ? "ModalSlideIn"
      : show === "exiting"
      ? "ModalSlideOut"
      : null,
  ];

  const [menuContent, setMenuContent] = useState(null);

  useEffect(() => {
    setMenuContent(nowContent);
    
  }, [nowContent]);

  let animationClass = animation.join(" ");
  let slideAnimationClass = slide.join(" ");

  // 잡담주제 클릭시 Axios 통신을 통해 값을 받아오는 함수 필요
  //촬영 클릭 시 현재 화면 캡쳐하는 함수 필요 (mainroom 위치에서 해야할듯?)

  return (
    <div className={styles[animationClass]}>
      <div
        className={styles.gameGuide}
        id={styles.outside}
        onClick={closeMenu}
      >
        <div
          className={`${styles[slideAnimationClass]} ${styles.menucontainer} ${styles[menuContent]}`}
          onClick={(e) => e.stopPropagation()}
        >
          {menuContent === "chatSubject" && <ChatingSubjectLoading/>}
          {menuContent === "chooseGame" && <ChooseGame/>}
          {menuContent === "takePhoto" && <PhotoShoot/> }
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomMenuFrame);
