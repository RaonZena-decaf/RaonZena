import React, { useEffect, useState } from "react";
import style from "./create.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar"
// import Footer from "../../components/footer"
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
} from "react-icons/fa";

function Create() {
  const navigate = useNavigate();
  const [roomname, setRoomname] = useState("");
  const [attend, setAttend] = useState(0);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  useEffect(() => {
    setRoomname("samplename");
    setAttend(3);
  }, [roomname, attend]);

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
      <Navbar />
      <div className={style.container}>
        <div className={style.innercontainer}>
          <div className={style.leftcontainer}>
            <h2 className={style.header}>
              <span>방을 만드는 중 입니다</span>
            </h2>

            <form id="create" className={style.textcont}>
              <ul className={style.bottom}>
                <li>
                  <label className={style.tag} htmlfor="title">
                    방 제목
                  </label>
                  <input placeholder="방 제목을 입력하세요" id="title"></input>
                </li>

                <li>
                  <label className={style.tag}>인원 수</label>
                  <div class="radio-group">
                    <input type="radio" id="option-one" name="selector" />
                    <label className={style.human} htmlfor="option-one">
                      One
                    </label>
                    <input type="radio" id="option-two" name="selector" />
                    <label className={style.human} htmlfor="option-two">
                      Two
                    </label>
                  </div>
                </li>

                <li>
                  <label className={style.tag} htmlfor="password">
                    비밀번호(선택)
                  </label>
                  <input placeholder="방 비밀번호를 입력하세요" id="password" />
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
            <button className={style.enter} type="submit" htmlform="create">
              방 만들기
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Create;
