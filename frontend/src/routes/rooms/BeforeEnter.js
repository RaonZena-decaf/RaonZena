import React, { useEffect, useState } from "react";
import style from "./beforeenter.module.css";
import { useNavigate } from "react-router-dom";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
  FaUser,
} from "react-icons/fa";

function BeforeEnter() {
  const navigate = useNavigate();
  const [roomname, setRoomname] = useState("");
  const [attend, setAttend] = useState(0);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  // 방에 접근 시 axios 통신이나 정보를 받아와서 방 정보 갱신 하는 부분
  useEffect(() => {
    setRoomname("samplename");
    setAttend(3);
  }, [roomname, attend]);
  const enterOnClick = () => {
    navigate("/room/1");
  };
  // 이전 페이지로 돌아가기
  const backOnClick = () => {
    navigate(-1);
  };
  // 마이크와 카메라 정보 갱신 부분

  useEffect(() => {
    // 어디서 화상 상태와 이와 관련된 default값을 가져오는가?
  });
  const micOnClick = () => {
    setMic((prev) => {
      return !prev;
    });
  };
  const cameraOnClick = () => {
    setCamera((prev) => {
      return !prev;
    });
  };

  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.innercontainer}>
          <div className={style.leftcontainer}>
            <h2 className={style.header}>
              <span>{roomname}</span>에 참가 준비 중 입니다
            </h2>
            <div className={style.bottom}>
              <div className={style.textcont}>
                <FaUser className={style.highlight} /> 현재 {attend}/6 명이 방에
                있습니다
              </div>
              <div className={style.textcont}>
                카메라와 마이크 권한을 요청합니다. <br />
                요청 메세지를 확인하여 주세요.
              </div>
              <div className={style.textcont}>
                만약 오류가 발생하였을 경우, <br /> 홈 화면으로 이동 후 재접속
                하시기 바랍니다
              </div>
            </div>
            <button onClick={backOnClick}>나가기</button>
          </div>

          <div className={style.rightcontainer}>
            <div className={style.video}>화상</div>
            <div className={style.accessory}>
              {mic ? (
                <FaMicrophoneAlt onClick={micOnClick} />
              ) : (
                <FaMicrophoneAltSlash onClick={micOnClick} />
              )}

              {camera ? (
                <FaVideo onClick={cameraOnClick} />
              ) : (
                <FaVideoSlash onClick={cameraOnClick} />
              )}
            </div>
            <button className={style.enter} onClick={enterOnClick}>
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BeforeEnter;
