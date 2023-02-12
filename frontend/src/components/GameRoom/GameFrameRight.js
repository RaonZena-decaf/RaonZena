import React, { useState, useEffect } from "react";
import styles from "./GameFrameRight.module.css";

import UserVideoComponent from "../camera/UserVideoComponent";

function GameFrameRight({ startHandler, start, setResult, openvidu }) {
  const peopleList = [1, 2, 3, 4, 5, 6];
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

  const videoFrame = () => {
    if (peopleList.length === 1) {
      return "videoFrame";
    } else if (peopleList.length === 2) {
      return "videoFrame2";
    } else if (peopleList.length <= 4) {
      return "videoFrame3";
    } else if (5 <= peopleList.length) {
      return "videoFrame4";
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {openvidu.subscribes.map((sub, idx) => {
          return <UserVideoComponent key={idx} streamManager={sub}/>;
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
          <button className={styles.button} onClick={startHandler}>
            시작
          </button>
        ) : (
          <button className={styles.button}>게임종료</button>
        )}
      </div>
    </div>
  );
}

export default GameFrameRight;
