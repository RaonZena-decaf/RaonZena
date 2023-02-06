import React, { useState, useEffect } from "react";
import { ShoutInSilenceAnswerList } from "./ShoutInSilenceAnswerList";
import Camera from "../camera/camera1";
import styles from "../game/ShoutInSilence.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ShoutInSilence({ start }) {
  const cameraList = [1, 2, 3, 4, 5, 6];
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [isCorrect, setIsCorrect] = useState(false); // 정답 유무
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const baseUrl = useSelector((store) => store.baseUrl);

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

  //axios로 정답 리스트 가져오는 부분
  const [answerList, setAnswerList] = useState([]);
  function getAnswerList() {
    axios({
      method: "get",
      url: `${baseUrl}api/v1/games/gameType/2`,
    })
      .then((res) => {
        console.log(res);
        setAnswerList(res.data);
      })
      .catch((error) => console.log(error));
  }

  //타이머 설정
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  start = true; // 게임 시작 버튼 눌렸다고 가정

  useEffect(() => {
    if (start) {
      if (step >= ShoutInSilenceAnswerList.length - 1) {
        alert("게임이 종료되었습니다.");
        return;
      }
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setSeconds(parseInt(10));
      }, 10000);
    }
  }, [start, step]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div>
            <div>
              {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
            </div>

            <div>
              번호: {ShoutInSilenceAnswerList[step].speak_no} /{" "}
              {ShoutInSilenceAnswerList.length}
            </div>
            <div>정답: {ShoutInSilenceAnswerList[step].answer}</div>

            <div></div>
            <div className={styles.inputcont}>
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
              <button className={styles.button}>게임시작</button>
            </div>
          </div>
        </div>

        <div className={styles.rightcontainer}>
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
