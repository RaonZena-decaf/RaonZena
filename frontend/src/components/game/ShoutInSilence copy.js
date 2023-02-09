import React, { useState, useEffect, useRef } from "react";
import styles from "../game/ShoutInSilence.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AnswerList } from "./ShoutInSilenceList";

export default function ShoutInSilence({
  start,
  result,
  setResult,
  IsHost,
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
  const [timeRemaining, setTimeRemaining] = useState(3);
  const [gameStart, setGameStart] = useState(start);

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

  //타이머 설정
  useEffect(() => {
    if (gameStart) {
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
    }
  }, [gameStart, minutes, seconds]);

  // 정답 체크 기능
  useEffect(() => {
    if (gameStart && step <= AnswerList.length - 1) {
      if (timeRemaining > 0 && !isAnswerShown) {
        const intervalId = setInterval(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 100);
        return () => clearInterval(intervalId);
      }
      if (timeRemaining === 0 && !isAnswerShown) {
        setIsAnswerShown(true);
      }
      if (isAnswerShown) {
        if (step === AnswerList.length - 1) {
          setIsAnswerShown(true);
          return;
        } else {
          setTimeout(() => {
            setIsAnswerShown(false);
            setTimeRemaining(3);
            setStep((prev) => (prev += 1));
          }, 1000);
        }
      }
    }
  }, [gameStart, timeRemaining, isAnswerShown]);

  useEffect(() => {
    if (result !== "") {
      if (result === AnswerList[step].answer) {
        console.log("정답");
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
        setResult("");
      }
    }
  }, [result]);

  useEffect(() => {
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
  }, []);

  IsHost = true;

  if (IsHost) {
    return (
      <div>
        <div className={styles.AnswerFont}>
          {AnswerList[step].question_no} / {AnswerList.length}
        </div>

        <div className={styles.AnswerFont}>
          문제 : {AnswerList[step].answer}
        </div>
        <div>
          <video autoPlay={false} ref={videoRef} width="80%" height="80%" />
          <span className={styles.HostCameraTimeLimit}>
            {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.background}>
        <div>
          제한 시간 {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
        </div>

        <div>
          번호: {AnswerList[step].question_no} / {AnswerList.length}
        </div>

        <video autoPlay={true} ref={videoRef} width="100%" height="100%" />
      </div>
    );
  }
}
