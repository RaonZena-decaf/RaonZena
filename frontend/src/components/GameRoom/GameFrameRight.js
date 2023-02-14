import React, { useState, useEffect } from "react";
import styles from "./GameFrameRight.module.css";

import UserVideoComponent from "../camera/UserVideoComponent";

function GameFrameRight({
  startHandler,
  start,
  setResult,
  host,
  publisher,
  subscribes,
  roomNo,
  openvidu,
  setStart,
  end,
}) {
  const [answer, setAnswer] = useState("");
  const answerOnchange = (e) => {
    setAnswer(e.target.value);
  };
  const answerOnclick = (e) => {
    e.preventDefault();
    if (answer !== "") {
      // console.log(answer);
      setResult(answer);
    }
    setAnswer("");
  };
  const restart = () => {
    openvidu.session.signal({
      type: "GameRestart",
    });
  };
  const videoFrame = () => {
    if (subscribes.length === 0) {
      return "videoFrame";
    } else if (subscribes.length === 1) {
      return "videoFrame2";
    } else if (subscribes.length <= 3) {
      return "videoFrame3";
    } else if (4 <= subscribes.length) {
      return "videoFrame4";
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles[videoFrame()]}>
          <UserVideoComponent streamManager={publisher} />
        </div>
        {subscribes.map((sub, idx) => {
          return (
            <div className={styles[videoFrame()]}>
              <UserVideoComponent key={idx} streamManager={sub} />
            </div>
          );
        })}
      </div>
      <div className={styles.submit}>
        <form id="answer" className={styles.answer}>
          <input
            value={answer}
            onChange={answerOnchange}
            className={styles.chatting}
            type="text"
            placeholder="정답을 입력해 주세요"
          ></input>
        </form>
        <button
          onClick={answerOnclick}
          type="submit"
          className={styles.button}
          form="answer"
        >
          제출
        </button>
        {!start ? (
          end ? (
            <button className={styles.button} onClick={restart}>
              다시하기
            </button>
          ) : (
            <button className={styles.button} onClick={startHandler}>
              시작
            </button>
          )
        ) : null}
      </div>
    </div>
  );
}

export default GameFrameRight;
