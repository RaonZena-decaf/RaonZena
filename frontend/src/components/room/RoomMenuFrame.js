import React, { useEffect, useState } from "react";
import styles from "./RoomMenuFrame.module.css";
import ChatingSubjectLoading from "./ChatingSubjectLoading"
import PhotoShoot from "./PhotoShoot"
import ChooseGame from "./ChooseGame"
import ExitRoom from "./ExitRoom";
import { useSelector } from "react-redux";
import axios from "axios";


const RoomMenuFrame = ({ show, closeMenu, nowContent, exitaction, ChangeGame}) => {
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
  const [chattingSubject, setChattingSubject] = useState("") 
  const baseUrl = useSelector((store)=>store.baseUrl)

  const getSubject = () => {
    axios({
      method:"GET",
      url:`${baseUrl}games/gameType/1`
    }).then((res) => {
      setChattingSubject(res.data.answer)
    }).catch(error=>{
      setChattingSubject("오류가 발생했습니다. 다시 진행해 주세요.")
    })
  }

  useEffect(() => {
    setMenuContent(nowContent);
    if (nowContent === "chatSubject") {
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
          {menuContent === "chooseGame" && <ChooseGame ChangeGame={ChangeGame} />}
          {menuContent === "chatSubject" && <ChatingSubjectLoading chattingSubject={chattingSubject} getSubject={getSubject}/>}
          {menuContent === "takePhoto" && <PhotoShoot closeMenu={closeMenu}/> }
          {menuContent === "exitRoom" && <ExitRoom closeMenu={closeMenu} onClick={exitaction()} /> }
        </div>
      </div>
    </div>
  );
};

export default React.memo(RoomMenuFrame);
