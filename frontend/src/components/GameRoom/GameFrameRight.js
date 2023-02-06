import React, { useState, useEffect } from "react";
import styles from "./GameFrameRight.module.css";
import SampleVideo from "../camera/SampleVideo";

function GameFrameRight({ startHandler, start, setResult }) {
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

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {peopleList.map((people, idx) => {
          return <SampleVideo />;
        })}
      </div>
      <div className={styles.submit}>
        {/* <input className={styles.answer}></input> */}
        <form id="answer">
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
            게임시작
          </button>
        ) : (
          <button className={styles.button}>게임종료</button>
        )}
      </div>
    </div>
  );
}

export default GameFrameRight;
