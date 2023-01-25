import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function MenuBar() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  // redux에서 createroom이나 enter 단계에서 설정한 기본값을 받아와야 함

  // 음성 및 영상 토글을 위한 함수
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    // publisher.publishAudio(audioEnabled)
    console.log("audiotoggled");
  };
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    // publisher.publishVideo(videoEnabled)
    console.log("videotoggled");
  };

  // dropup을 위한 state
  const [drop, setdrop] = useState(false);
  const droptoggle = () => {
    setdrop(!drop);
  };

  //방에서 나간 후 라이브 페이지로 돌아가는 함수
  const navigate = useNavigate();
  const exitRoom = () => {
    //이곳에 방에서 나가는 요청을 보내는 함수를 넣는다.
    navigate("/live");
  };

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

      <div className={style.MiddleContainer2}>
        <div className={style.IconWithText}>
          <FaMugHot />
          <p className={style.UnderIcon}>잡담주제</p>
        </div>
        <div className={style.IconWithText}>
          <FaGamepad />
          <p className={style.UnderIcon}>게임</p>
        </div>
        <div className={style.IconWithText}>
          <FaCamera />
          <p className={style.UnderIcon}>사진촬영</p>
        </div>
      </div>

      <div className={style.MiddleContainer3}>
        <div className={style.IconWithText}>
          <FaComments />
          <p className={style.UnderIcon}>채팅</p>
        </div>
        <div className={style.ExitButton} onClick={exitRoom}>
          {" "}
          나가기{" "}
        </div>
      </div>
    </div>
  );
}

export default React.memo(MenuBar);
