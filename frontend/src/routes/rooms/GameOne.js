import React, { useEffect, useState } from "react";
import ScoreBoard from "../../components/game/scoreboard";
import CatchMind from "../../components/game/catchmind";
import Camera from "../../components/camera/camera1";
import style from "../rooms/gameone.module.css";

function GameOne() {
  const cameraList = [1, 2, 3, 4, 5, 6];
  const [answer, setAnswer] = useState("");

  // answer 관련 처리
  const answerOnchange = (e) => {
    setAnswer(e.target.value);
  };
  const answerOnclick = (e) => {
    e.preventDefault();
    if (answer !== "") {
      console.log(answer);
    }
    setAnswer("");
  };

  return (
    <div>
      <div className={style.container}>
        <div className={style.leftcontainer}>
          <h1 className={style.header}>캐치 마인드</h1>
          <div>
            <div>
              <CatchMind />
            </div>
            <div>
              <ScoreBoard />
            </div>
            <div className={style.inputcont}>
              <form id="answer">
                <input
                  value={answer}
                  onChange={answerOnchange}
                  className={style.chatting}
                  type="text"
                  placeholder="정답을 입력해 주세요"
                ></input>
              </form>
              <button
                onClick={answerOnclick}
                type="submit"
                className={style.button}
                form="answer"
              >
                제출
              </button>
              <button className={style.button}>
                게임
                <br />
                종료
              </button>
            </div>
          </div>
        </div>

        <div className={style.rightcontainer}>
          {/* 반복 6번 */}
          {cameraList.map((camera, idx) => {
            return (
              <div key={idx}>
                <div>Chatting</div>
                <Camera camera={camera} />
              </div>
            );
          })}
        </div>
      </div>
      <footer>Footer</footer>
    </div>
  );
}

export default GameOne;
