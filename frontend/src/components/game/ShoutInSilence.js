import React, { useState, useEffect, useRef } from "react";
import styles from "../game/ShoutInSilence.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AnswerList } from "./ShoutInSilenceList";
import { style } from "@mui/system";

export default function ShoutInSilence({
  start,
  result,
  setResult,
  host,
  openvidu,
}) {
  const timeLimit = 10;

  const [step, setStep] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(timeLimit);
  const [isWrong, setIsWrong] = useState(false); // 정답 유무
  const [answer, setAnswer] = useState("");
  const baseUrl = useSelector((store) => store.baseUrl);
  const videoRef = useRef(null);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  const [showAnswer, setShowAnswer] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {}, 300);
  };

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
      url: `${baseUrl}games/gameType/1`,
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
      // 시간이 남았는데 정답을 못맞춘 경우
      if (timeRemaining > 0 && !isAnswerShown) {
        //
        const intervalId = setInterval(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
      // 제한 시간이 끝난 후 정답을 못맞춘 경우
      if (timeRemaining === 0 && !isAnswerShown) {
        setIsAnswerShown(true);
      }

      //정답을 맞춘 경우
      if (isAnswerShown) {
        //마지막 문제인 경우
        if (step === AnswerList.length - 1) {
          setIsAnswerShown(true);
          return;
        } else {
          const timeoutId = setTimeout(() => {
            setIsAnswerShown(false);
            setTimeRemaining(timeLimit);
            setStep((prev) => (prev += 1));
          }, 1000);
          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [start, timeRemaining, isAnswerShown]);

  useEffect(() => {
    if (host === false) {
      if (result !== "") {
        //정답 맞춘 로직
        if (result === AnswerList[step].answer) {
          console.log("정답");
          // setModalShow(true);
          const data = {
            correct: openvidu.userName,
          };
          openvidu.session.signal({
            data: JSON.stringify(data),
            type: "TrueAnswer",
          });
          setResult("");
        }
        //틀린 로직
        else {
          console.log("오답");
          setResult("");
          document.getElementById("wrongMassage").style.display = "block";
          setTimeout(function () {
            document.getElementById("wrongMassage").style.display = "none";
          }, 200);
        }
      }
    }
  }, [result]);

  function wrongAlert() {}

  useEffect(() => {
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
  }, []);

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };
  
  console.log("host는===", host)

  if (host) {
    return (
      <div>
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
  }
  // 게스트 화면
  else {
    return (
      <div>
        <div id="wrongMassage" className={styles.wrongMassage}>
          틀렸습니다
        </div>
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
