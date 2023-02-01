import React, { useEffect, useState } from "react";
import styles from "./RoomMenuFrame.module.css";
import ChatingSubjectLoading from "./ChatingSubjectLoading"
import PhotoShoot from "./PhotoShoot"
import ChooseGame from "./ChooseGame"
import ExitRoom from "./ExitRoom";
import axios from "axios";

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

  //잡담주제 호출을 위한 함수
  const [chattingSubject, setChattingSubject] = useState("예시 잡담 주제") 

  const getSubject = async() => {
    await axios({
      method:"GET",
      url:"http://localhost:8080/api/v1/games/topicList"
    }).then((res) => {
      setChattingSubject(res.data)
    }).catch(error=>{
      setChattingSubject("오류가 발생했습니다. 다시 진행해 주세요.")
    })
  }

  useEffect(() => {
    setMenuContent(nowContent);
    if (nowContent === "chatsubject") {
      getSubject()
    }
    
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
          {menuContent === "chatSubject" && <ChatingSubjectLoading chattingSubject={chattingSubject}/>}
          {menuContent === "chooseGame" && <ChooseGame/>}
          {menuContent === "takePhoto" && <PhotoShoot closeMenu={closeMenu}/> }
          {menuContent === "exitRoom" && <ExitRoom closeMenu={closeMenu}/> }
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomMenuFrame);
