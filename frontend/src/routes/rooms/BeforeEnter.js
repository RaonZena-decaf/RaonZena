import React, { useState, useRef, useEffect } from "react";
import style from "./beforeenter.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/navbar";
import VideoContainer from "../../components/camera/NoneVideo";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Loading from "../../components/room/MainLoading";

function BeforeEnter() {
  const { state } = useLocation();
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(
    state.password === "True" ? false : true
  );
  const [loading, setLoading] = useState(false);
  const baseUrl = useSelector((store) => store.baseUrl);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
  }, []);
  // 이전 페이지로 돌아가기
  const backOnClick = () => {
    navigate(-1);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const passwordRef = useRef();

  const labelFocus = () => {
    if (disabled === true) {
      passwordRef.current.focus();
    }
  };

  // 세션 참가
  const joinSession = () => {
    if (state.password === "True") {
      const data = {
        roomNo: state.roomNo,
        inputPassword: password,
      };
      console.log(data);
      axios({
        method: "post",
        url: `${baseUrl}live/passwordCheck`,
        data: data,
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          if (res.data === "Success") {
            navigate(`/room/${state.roomNo}`, {
              state: {
                mic,
                camera,
                roomNo: state.roomNo,
                roomTitle: state.roomTitle,
                host: false,
              },
            });
          } else {
            alert("비밀번호가 잘못되었습니다");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate(`/room/${state.roomNo}`, {
        state: {
          mic,
          camera,
          roomNo: state.roomNo,
          roomTitle: state.roomTitle,
          host: false,
        },
      });
    }
  };

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
    <>
      <Navbar />
      {loading ? (
        <div className={style.background}>
          <div className={style.container}>
            <div className={style.innercontainer}>
              <div className={style.leftcontainer}>
                <h2 className={style.header}>
                  <span>{state.roomTitle}</span>에 참가 준비 중 입니다.
                </h2>
                <div>
                  <div className={style.textcont}>
                    <FaUser className={style.highlight} /> 현재
                    {state.users}
                    /6 명이 방에 있습니다.
                  </div>
                  <div className={style.textcont}>
                    카메라와 마이크 권한을 요청합니다. <br />
                    요청 메세지를 확인하여 주세요.
                  </div>
                  <div className={style.textcont}>
                    화상이 완전히 출력된 이후에 <br /> 참여하시기 바랍니다.
                  </div>
                  <div className={style.textcont}>
                    만약 오류가 발생하였을 경우, <br /> 홈 화면으로 이동 후
                    재접속하여 주세요.
                  </div>
                </div>
                <label className={style.tag} htmlFor="password">
                  <input
                    placeholder="방 비밀번호를 입력하세요"
                    id="password"
                    value={password}
                    onChange={passwordChange}
                    className={style.input}
                    disabled={disabled}
                  />
                </label>
                <button className={style.button} onClick={backOnClick}>
                  나가기
                </button>
              </div>

              <div className={style.rightcontainer}>
                <div className={style.video}>
                  <VideoContainer mic={mic} camera={camera} />
                </div>
                <div className={style.accessory}>
                  {mic ? (
                    <FaMicrophoneAlt
                      onClick={micOnClick}
                      className={style.togglekey}
                    />
                  ) : (
                    <FaMicrophoneAltSlash
                      onClick={micOnClick}
                      className={style.togglekey}
                    />
                  )}

                  {camera ? (
                    <FaVideo
                      onClick={cameraOnClick}
                      className={style.togglekey}
                    />
                  ) : (
                    <FaVideoSlash
                      onClick={cameraOnClick}
                      className={style.togglekey}
                    />
                  )}
                </div>
                <button className={style.enter} onClick={joinSession}>
                  들어가기
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default BeforeEnter;
