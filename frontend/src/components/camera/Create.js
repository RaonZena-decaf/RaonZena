import React, { useEffect, useState } from "react";
import style from "./create.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
} from "react-icons/fa";

// 물어볼거
// 비밀번호 입력 칸 비밀번호 모습으로 감춰야 할까?
// 수정할 부분
// 1. input 길이들 좀 더 반응형으로 2. 화상 관련 입력 값 주의 3. 마이크, 화상 가릴 경우의 axios 4. 방 만들기 시 axios 통신? 다음 이동공간 6. 사람수 버튼에서 이상한 화상 있긴 함 확인 필요

function Create() {
  const navigate = useNavigate();
  const [roomname, setRoomname] = useState("");
  const [password, setPassword] = useState("");
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [peoplenum, setPeopleNum] = useState("2");

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
  // 사람 수 체크하는 부분(클릭 값에 따른 스타일 변경)
  const peopleOnClick = (event) => {
    setPeopleNum(event.target.id);
  };

  // 방 만드는 axios 통신
  const createOnClick = (event) => {
    event.preventDefault();
    if (roomname === "") {
      alert("Please enter a room name");
    } else {
      console.log(roomname, password, peoplenum);
      // navigate()
    }
  };

  return (
    <div className={style.background}>
      <Navbar />
      <div className={style.container}>
        <div className={style.innercontainer}>
          <div className={style.leftcontainer}>
            <h2 className={style.header}>
              <span>방을 만드는 중 입니다</span>
            </h2>

            <form id="create" className={style.textcont}>
              <ul>
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

                <li>
                  <label className={style.tag}>인원 수</label>
                  <div className={style.containerRadio}>
                    <div className={style.radiotileGroup}>
                      <div
                        className={style.inputContainer}
                        onClick={peopleOnClick}
                      >
                        <input
                          id="2"
                          className={style.radioButton}
                          type="radio"
                          name="radio"
                        />
                        <div
                          className={
                            peoplenum === "2"
                              ? style.radioTile
                              : style.radioTileNone
                          }
                          id="2"
                        >
                          <label id="2" className={style.radioTileLabel}>
                            2
                          </label>
                        </div>
                      </div>
                      <div
                        className={style.inputContainer}
                        onClick={peopleOnClick}
                      >
                        <input
                          id="3"
                          className={style.radioButton}
                          type="radio"
                          name="radio"
                        />
                        <div
                          className={
                            peoplenum === "3"
                              ? style.radioTile
                              : style.radioTileNone
                          }
                          id="3"
                        >
                          <label id="3" className={style.radioTileLabel}>
                            3
                          </label>
                        </div>
                      </div>
                      <div
                        className={style.inputContainer}
                        onClick={peopleOnClick}
                      >
                        <input
                          id="4"
                          className={style.radioButton}
                          type="radio"
                          name="radio"
                        />
                        <div
                          className={
                            peoplenum === "4"
                              ? style.radioTile
                              : style.radioTileNone
                          }
                          id="4"
                        >
                          <label
                            id="4"
                            className={style.radioTileLabel}
                            onClick={peopleOnClick}
                          >
                            4
                          </label>
                        </div>
                      </div>
                      <div
                        className={style.inputContainer}
                        onClick={peopleOnClick}
                      >
                        <input
                          id="5"
                          className={style.radioButton}
                          type="radio"
                          name="radio"
                        />
                        <div
                          className={
                            peoplenum === "5"
                              ? style.radioTile
                              : style.radioTileNone
                          }
                          id="5"
                        >
                          <label
                            id="5"
                            className={style.radioTileLabel}
                            onClick={peopleOnClick}
                          >
                            5
                          </label>
                        </div>
                      </div>
                      <div
                        className={style.inputContainer}
                        onClick={peopleOnClick}
                      >
                        <input
                          id="6"
                          className={style.radioButton}
                          type="radio"
                          name="radio"
                        />
                        <div
                          className={
                            peoplenum === "6"
                              ? style.radioTile
                              : style.radioTileNone
                          }
                          id="6"
                        >
                          <label
                            id="6"
                            className={style.radioTileLabel}
                            onClick={peopleOnClick}
                          >
                            6
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <label className={style.tag} htmlFor="password">
                    비밀번호(선택)
                  </label>
                  <input
                    placeholder="방 비밀번호를 입력하세요"
                    id="password"
                    value={password}
                    onChange={passwordChange}
                    className={style.input}
                  />
                </li>
              </ul>
            </form>
            <button onClick={backOnClick}>취소</button>
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
            <button
              className={style.enter}
              type="submit"
              htmlform="create"
              onClick={createOnClick}
            >
              방 만들기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Create;
