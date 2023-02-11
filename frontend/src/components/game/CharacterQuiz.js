import React, { useEffect, useState } from "react";
import styles from "./CharacterQuiz.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

function CharacterQuiz({ start, result, setResult, openvidu }) {
  const [step, setStep] = useState(0);
  const baseUrl = useSelector((store) => store.baseUrl);

  const [characterimg, setCharacterimg] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}games/gameType/4`,
    })
      .then((res) => {
        setCharacterimg(res.data);
        console.log(res.data);
        console.log(setCharacterimg);
      })
      .catch((error) => console.log(error));
  }, []);

  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setIsAnswerShown(true);
    });
  }
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);

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
  }, [start, timeRemaining, isAnswerShown]);

  useEffect(() => {
    if (result !== "") {
      if (result === characterimg[step].answer) {
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
    const audio = new Audio();
    audio.src = "../music/Girasol.mp3";
    audio.play();
    return () => {
      audio.pause();
    }
  },[]);
  return (
    <div className={styles.background}>
      {isAnswerShown ? (
        <div className={styles.result}>
          <h1>정답은 {characterimg[step].answer} 입니다.</h1>
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
      )}
    </div>
  );
}

export default CharacterQuiz;
