import React, { useEffect, useState } from "react";
import styles from "./CharacterQuiz.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

function CharacterQuiz({
  start,
  result,
  setResult,
  openvidu,
  host,
  setEnd,
  setStart,
}) {
  const timeLimit = 5;

  const [step, setStep] = useState(0);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [minutes, setMinutes] = useState(0);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  const [characterimg, setCharacterimg] = useState({});
  const dataAxios = () => {
    if (host) {
      axios({
        method: "GET",
        url: `${baseUrl}games/gameType/4`,
      })
        .then((res) => {
          setCharacterimg(res.data);
          if (openvidu.session) {
            const data = JSON.stringify(res.data);
            openvidu.session.signal({
              data: data,
              type: "CharacterQuizSeedNumber",
            });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    dataAxios();
    // 시그널을 한번만 작동시키기 위한 방법
    if (openvidu.session) {
      openvidu.session.on("signal:TrueAnswer", (event) => {
        const data = JSON.parse(event.data);
        setIsAnswerShown(true);
      });
      openvidu.session.on("signal:CharacterQuizSeedNumber", (event) => {
        const data = JSON.parse(event.data);
        setCharacterimg(data);
      });
      openvidu.session.on("signal:GameRestart", () => {
        setStep(0);
        dataAxios();
      });
    }
    // return () => {
    //   openvidu.session.off("signal:TrueAnswer")
    //   openvidu.session.off("signal:SeedNumber")
    //   openvidu.session.off("signal:GameRestart")
    // }
  }, []);

  useEffect(() => {
    if (start && step <= characterimg.length - 1) {
      if (timeRemaining > 0 && !isAnswerShown) {
        const intervalId = setInterval(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
      if (timeRemaining === 0 && !isAnswerShown) {
        setIsAnswerShown(true);
      }
      if (isAnswerShown) {
        if (step === characterimg.length - 1) {
          setTimeout(() => {
            setIsAnswerShown(false);
            setTimeRemaining(timeLimit);
            setStep((prev) => (prev += 1));
            setEnd(true);
            setStart(false);
          }, 1000);
        } else {
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
    if (result !== "" && step < characterimg.length) {
      if (result === characterimg[step].answer) {
        const data = {
          userNo: openvidu.userNo,
          score: 5,
        };
        openvidu.session.signal({
          data: JSON.stringify(data),
          type: "TrueAnswer",
        });
        setResult("");
      } else {
        setResult("");
        document.getElementById("wrongMassage").style.display = "block";
        setTimeout(function () {
          document.getElementById("wrongMassage").style.display = "none";
        }, 200);
      }
    }
  }, [result]);

  useEffect(() => {
    const audio = new Audio();
    audio.src = "../music/Girasol.mp3";
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);
  return (
    <div>
      <div id="wrongMassage" className={styles.wrongMassage}>
        틀렸습니다{" "}
      </div>

      <div className={styles.background}>
        <div className={styles.Container}>
          <span className={styles.questionNo}>
            {step >= characterimg.length ? step : step + 1} /
            {characterimg.length}
          </span>
          <span className={styles.TimeLimit}>
            {minutes} :{" "}
            {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
          </span>
        </div>
        {start ? (
          step === characterimg.length ? (
            <div className={styles.result}>
              <h1>인물퀴즈 끝!!!</h1>
            </div>
          ) : isAnswerShown ? (
            <div className={styles.result}>
              <h1>{characterimg[step].answer}</h1>
            </div>
          ) : (
            characterimg &&
            characterimg[step] && (
              <img
                alt="img"
                src={characterimg[step].imageUrl}
                className={styles.img}
              />
            )
          )
        ) : (
          <div className={styles.result}>
            <h1>인물퀴즈 시작합니다!!!</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterQuiz;
