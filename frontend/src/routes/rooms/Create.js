import React, { useRef, useState } from "react";
import style from "./create.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer";
import VideoContainer from "../../components/camera/NoneVideo";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
} from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

// 물어볼거
// 비밀번호 입력 칸 비밀번호 모습으로 감춰야 할까?
// 수정할 부분
// 1. input 길이들 좀 더 반응형으로 2. 화상 관련 입력 값 주의 3. 마이크, 화상 가릴 경우의 axios 4. 방 만들기 시 axios 통신? 다음 이동공간 6. 사람수 버튼에서 이상한 화상 있긴 함 확인 필요

function Create() {
  const navigate = useNavigate();
  const baseUrl = useSelector((store) => store.baseUrl);
  const [roomname, setRoomname] = useState("");
  const [password, setPassword] = useState("");
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [peoplenum, setPeopleNum] = useState("2");
  const [disabled, setDisabled] = useState(true);

  // 방 제목과 비밀번호 input 처리 하는 곳
  const nameChange = (event) => {
    setRoomname(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  // 뒤로가기
  const backOnClick = () => {
    navigate(-1);
  };

  // 마이크와 카메라 정보 갱신 부분

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
  // 사람 수 체크하는 부분(클릭 값에 따른 스타일 변경)
  const peopleOnChange = (event) => {
    setPeopleNum(event.target.value);
  };
  const disableOnClick = (event) => {
    setDisabled((prev) => !prev);
  };
  const passwordRef = useRef();

  const labelFocus = () => {
    if (disabled === true) {
      passwordRef.current.focus();
    }
  };

  const user = useSelector((store) => store.userData);

  // 방 만드는 axios 통신
  const createOnClick = (event) => {
    event.preventDefault();
    if (roomname === "") {
      alert("방 제목을 입력해 주세요");
    } else {
      if (!disabled && password === "") {
        alert("비밀번호를 입력해 주세요");
      } else {
        const data = {
          roomTitle: roomname,
          headcount: peoplenum,
          password: password,
          host: user.userId,
        };
        axios({
          method: "post",
          url: `${baseUrl}live/room`,
          data: data,
          headers: { "Content-type": "application/json" },
        })
          .then((res) => {
            navigate(`/room/${res.data.roomNo}`, {
              state: {
                mic,
                camera,
                roomNo: res.data.roomNo,
                roomTitle: res.data.roomTitle,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            alert("지금은 바쁩니다 다시 시도해 주세요");
          });
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className={style.background}>
        <div className={style.container}>
          <div className={style.innercontainer}>
            <div className={style.leftcontainer}>
              <h2 className={style.header}>
                <span>방 생성 중</span>
              </h2>
              <form id="create" className={style.textcont}>
                <ul className={style.ulTag}>
                  <li>
                    <label className={style.tag} htmlFor="title">
                      방 제목
                    </label>
                    <input
                      placeholder="방 제목을 입력하세요"
                      id="title"
                      value={roomname}
                      onChange={nameChange}
                      className={style.input}
                    ></input>
                  </li>

                  <li onClick={labelFocus}>
                    <label className={style.tag} htmlFor="password">
                      비밀번호
                      <input
                        id="checkbox"
                        className={style.checkbox}
                        type="checkbox"
                        name="color"
                        value={disabled}
                        onClick={disableOnClick}
                        ref={passwordRef}
                      />
                      <label htmlFor="checkbox" className={style.label} />
                    </label>
                    <input
                      placeholder="방 비밀번호를 입력하세요"
                      id="password"
                      value={password}
                      onChange={passwordChange}
                      className={style.input}
                      disabled={disabled}
                      type='number'
                    />
                  </li>

                  <li>
                    <label className={style.tag}>인원 수</label>
                    <select
                      className={style.dropdown}
                      name="peoplenum"
                      onChange={peopleOnChange}
                    >
                      <option value="2">2명</option>
                      <option value="3">3명</option>
                      <option value="4">4명</option>
                      <option value="5">5명</option>
                      <option value="6">6명</option>
                    </select>
                  </li>
                </ul>
              </form>
              <button className={style.button} onClick={backOnClick}>
                취소
              </button>
            </div>

            <div className={style.rightcontainer}>
              <div className={style.video}>
                <VideoContainer />
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
              <button
                className={style.enter}
                type="submit"
                htmlform="create"
                onClick={createOnClick}
              >
                생성
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Create;
