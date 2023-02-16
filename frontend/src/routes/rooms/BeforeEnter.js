import React, { useState, useRef, useEffect } from "react";
import style from "./beforeenter.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
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
  const params = useParams();
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(() => {
    if (state) {
      return state.password === "True" ? false : true;
    } else {
      return false;
    }
  });
  const [loading, setLoading] = useState(false);
  const baseUrl = useSelector((store) => store.baseUrl);
  const userNo = useSelector((store) => store.userData.userNo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate("/live");
    }
  }, []);
  // 이전 페이지로 돌아가기
  const backOnClick = () => {
    navigate(-1);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  // 세션 참가
  const joinSession = () => {
    if (state.password === "True") {
      const data = {
        roomNo: params.id,
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
            axios({
              method: "get",
              url: `${baseUrl}live/games/${params.id}/join`,
              headers: { "Content-type": "application/json" },
            }).then((res) => {
              if (res.data < state.headcount) {
                navigate(`/room/${params.id}`, {
                  state: {
                    mic,
                    camera,
                    roomNo: params.id,
                    roomTitle: state.roomTitle,
                    host: false,
                  },
                });
              } else {
                alert("지금 방이 가득 찼습니다. 나중에 시도해 주세요");
              }
            }).catch((err) => {console.log(err)})
          } else {
            alert("비밀번호가 잘못되었습니다");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios({
        method: "get",
        url: `${baseUrl}live/games/${params.id}/join`,
        headers: { "Content-type": "application/json" },
      }).then((res) => {
        if (res.data < state.headcount) {
          navigate(`/room/${params.id}`, {
            state: {
              mic,
              camera,
              roomNo: params.id,
              roomTitle: state.roomTitle,
              host: false,
            },
          });
        } else {
          alert("지금 방이 가득 찼습니다. 나중에 시도해 주세요");
        }
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
                    {state.users}/{state.headcount} 명이 방에 있습니다.
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
                {password ? (
                  <label className={style.tag} htmlFor="password">
                    <input
                      placeholder="방 비밀번호를 입력해주세요(숫자)"
                      id="password"
                      value={password}
                      onChange={passwordChange}
                      className={style.input}
                      disabled={disabled}
                    />
                  </label>
                ) : null}
                <button className={style.button} onClick={backOnClick}>
                  나가기
                </button>
              </div>

              <div className={style.rightcontainer}>
                <div className={style.video}>
                  {camera ? (
                    <VideoContainer mic={mic} camera={camera} />
                  ) : (
                    <img
                      src="../planet.png"
                      alt="NoVideo"
                      className={style.videoalt}
                    />
                  )}
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
