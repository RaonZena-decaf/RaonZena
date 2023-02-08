import React, { useEffect, useState } from "react";
import style from "./beforeenter.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/navbar";
import VideoContainer from "../../components/camera/NoneVideo";
import { useSelector } from "react-redux";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
  FaUser,
} from "react-icons/fa";

function BeforeEnter() {
  const { state } = useLocation();
  console.log("state", state);
  const user = useSelector((store) => store.userData);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const navigate = useNavigate();
  // 방 정보 세팅

  // 이전 페이지로 돌아가기
  const backOnClick = () => {
    navigate(-1);
  };
  // 마이크와 카메라 정보 갱신 부분
  const joinSession = () => {
    navigate(`/room/${state.roomnumber}`);
  };
  // useEffect(() => {
  //   if (state.rootTitle === undefined && user.userId === undefined) {
  //     navigate("/live");
  //   }
  // }, []);
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
      <Navbar />
      <div className={style.container}>
        <div className={style.innercontainer}>
          <div className={style.leftcontainer}>
            <h2 className={style.header}>
              <span>{state.Roomtitle}</span>에 참가 준비 중 입니다
            </h2>
            <div className={style.bottom}>
              <div className={style.textcont}>
                <FaUser className={style.highlight} /> 현재 {state.users}/
                {state.haedcount} 명이 방에 있습니다
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
            <button className={style.button} onClick={backOnClick}>
              나가기
            </button>
          </div>

          <div className={style.rightcontainer}>
            <VideoContainer />
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
            <button className={style.enter} onClick={joinSession}>
              Enter
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BeforeEnter;
