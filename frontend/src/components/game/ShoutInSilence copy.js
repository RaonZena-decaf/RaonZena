import React, { useState, useEffect, useRef } from "react";
import styles from "../game/ShoutInSilence.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AnswerList } from "./ShoutInSilenceList";

export default function ShoutInSilence({
  start,
  result,
  setResult,
  host,
  openvidu,
}) {
  const timeLimit = 5;

  const [step, setStep] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(timeLimit);
  const [isCorrect, setIsCorrect] = useState(false); // 정답 유무
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const baseUrl = useSelector((store) => store.baseUrl);
  const videoRef = useRef(null);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  // const [gameStart, setGameStart] = useState(start);

  // 세션 값이 있으면 해당 시그널(TrueAnswer)에 대한 밑에 있는 함수 실행
  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setIsAnswerShown(true);
    });
  }

  const handleVideo = () => {
    const video = videoRef.current;
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
      url: `${baseUrl}games/gameType/2`,
    })
      .then((res) => {
        console.log(res);
        setAnswerList(res.data);
      })
      .catch((error) => console.log(error));
  }

  // 정답 체크 기능
  useEffect(() => {
    if (start && step <= AnswerList.length - 1) {
      if (timeRemaining > 0 && !isAnswerShown) {
        //
        const intervalId = setInterval(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
      if (timeRemaining === 0 && !isAnswerShown) {
        setIsAnswerShown(true);
      }
      if (isAnswerShown) {
        if (step === AnswerList.length - 1) {
          setIsAnswerShown(true);
          return;
        }
        // 답 보여주는 함수
        else {
          setTimeout(() => {
            setIsAnswerShown(false);
            setTimeRemaining(timeLimit);
            setStep((prev) => (prev += 1));
          }, 1000);
        }
      }
    }
  }, [start, timeRemaining, isAnswerShown]);

  useEffect(() => {
    if (result !== "") {
      if (result === AnswerList[step].answer) {
        console.log("정답");
        alert("정답");
        const data = {
          correct: openvidu.userName,
        };
        openvidu.session.signal({
          data: JSON.stringify(data),
          type: "TrueAnswer",
        });
        setResult("");
      } else {
        console.log("오답");
        alert("오답");
        setResult("");
      }
    }
  }, [result]);

  useEffect(() => {
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
  }, []);

  if (true) {
    return (
      <div>
        {/* <div>
          <div className={styles.questionNo}>
            {step+1} / {AnswerList.length}
          </div>
          <div className={styles.AnswerFont}>
            문제 : {AnswerList[step].answer}
          </div>
        </div> */}
        <div>
          <div className={styles.webcamCapture}>
            <video ref={videoRef} width="80%" />
            <div className={styles.Container}>
              <span className={styles.TimeLimit}>
                {" "}
                {minutes} :{" "}
                {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
              </span>
              <span className={styles.AnswerFont}>
                {AnswerList[step].answer}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {/* <div>
          <div className={styles.questionNo}>
            {AnswerList[step].question_no} / {AnswerList.length}
          </div>
          <div className={styles.AnswerFont}>
            문제 : {AnswerList[step].answer}
          </div>
        </div> */}
        <div>
          <div className={styles.webcamCapture}>
            <video ref={videoRef} width="80%" />
            <div className={styles.Container}>
              <span className={styles.TimeLimit}>
                {" "}
                {minutes} :{" "}
                {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
