import React, { useState, useRef, useEffect } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaVideoSlash } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import { FaMugHot } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import style from "./MenuBar.module.css";
import MenuPortal from "./Portal"
import RoomMenuFrame from "./RoomMenuFrame"
import EntryDropUp from "./EntryDropUp"
import { Transition } from 'react-transition-group'



function MenuBar({toggleBar, exitaction, camera, mic, toggleDevice, ChangeGame}) {
  // 방 유저 정보를 axios 정보로 받아와서 리스트로 저장 => 참가자 드롭업 하부 컴포넌트로 삽입
  const [videoEnabled, setVideoEnabled] = useState(camera);
  const [audioEnabled, setAudioEnabled] = useState(mic);
  // redux에서 createroom이나 enter 단계에서 설정한 기본값을 받아와야 함
  // 음성 및 영상 토글을 위한 함수
  const toggleAudio = () => {
    setAudioEnabled(prev => !prev);
    console.log("audiotoggled");
  };
  const toggleVideo = () => {
    setVideoEnabled(prev => !prev);
    toggleDevice(videoEnabled, audioEnabled)
    console.log("videotoggled");
  };
  useEffect(() => {
    toggleDevice()
  },[])

  // 참가자dropup을 위한 state
  const [drop, setdrop] = useState(false);
  const droptoggle = () => {
    setdrop(!drop);
  };


  //메뉴 표시를 위한 함수
  const [menuOn, setMenuOn] = useState(false)
  const [nowContent, setNowContent] = useState("")
  const eventTarget = useRef({})
  const menuOpen = (event) => {
    eventTarget.current = event.target
    setNowContent(event.target.id)
    setMenuOn(true)
    if (event.target.id !== "exitRoom") {
      eventTarget.current.className = `${style.IconWithText} ${style.active}`
  }}
  const closeMenu = () => {
    setMenuOn(false)
    if (eventTarget.current.id !== "exitRoom") {
      eventTarget.current.className = `${style.IconWithText} ${style.inactive}`
  }}
  // 클릭에 따른 세션 랜더링 변화 값 전송을 어디서 해야 할건가?

  return (
    <div className={style.UpperContainer}>
      <div className={style.MiddleContainer1}>
        <div className={style.IconWithText} onClick={toggleAudio}>
          {audioEnabled ? <FaMicrophoneAlt /> : <FaMicrophoneAltSlash />}
          {audioEnabled ? (
            <p className={style.UnderIcon}>음소거</p>
          ) : (
            <p className={style.smallText}>음소거<br/>해제</p>
          )}
        </div>
        <div className={style.IconWithText} onClick={toggleVideo}>
          {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
          {videoEnabled ? (
            <p className={style.UnderIcon}>비디오 중지</p>
          ) : (
            <p className={style.UnderIcon}>비디오 시작</p>
          )}
        </div>
        <div className={style.IconWithText} onClick={droptoggle}>
          <FaUserAlt />
          <p className={style.UnderIcon}>참가자</p>
        </div>
      </div>

      <Transition unmountOnExit in={drop} timeout={500}>
        {state => (
          <EntryDropUp show={state} setdrop={setdrop}/>
        )}
      </Transition>

      <div className={style.MiddleContainer2}>
        <div className={style.IconWithText} onClick={menuOpen} id="chatSubject">
          <FaMugHot className={style.Noclick}/>
          <p className={`${style.UnderIcon} ${style.Noclick}`}>잡담주제</p>
        </div>
        <div className={style.IconWithText} onClick={menuOpen} id="chooseGame" >
          <FaGamepad className={style.Noclick}/>
          <p className={`${style.UnderIcon} ${style.Noclick}`}>게임</p>
        </div>
        <div className={style.IconWithText} onClick={menuOpen} id="takePhoto">
          <FaCamera className={style.Noclick}/>
          <p className={`${style.UnderIcon} ${style.Noclick}`}>사진촬영</p>
        </div>
      </div>

      <div className={style.MiddleContainer3}>
        <div className={style.IconWithText} onClick={toggleBar}>
          <FaComments />
          <p className={style.UnderIcon}>채팅</p>
        </div>
        <div className={style.ExitButton} onClick={menuOpen} id="exitRoom">
          나가기
        </div>
      </div>

      <MenuPortal>
        <Transition unmountOnExit in={menuOn} timeout={500}>
          {state => (
            <RoomMenuFrame show={state} closeMenu={closeMenu} nowContent={nowContent} exitaction={exitaction} ChangeGame={ChangeGame}/>
          )}
        </Transition>
      </MenuPortal>
    </div>
  );
}

export default React.memo(MenuBar);
