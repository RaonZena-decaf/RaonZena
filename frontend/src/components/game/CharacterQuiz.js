import { CharacterQuizList } from "./CharacterQuizList";
import React, { useEffect, useState } from "react";
import styles from "./CharacterQuiz.module.css";

function CharacterQuiz({ start, result, setResult, openvidu }) {
  const [step, setStep] = useState(0);

  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setIsAnswerShown(true);
    });
  }
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);

  useEffect(() => {
    if (start && step <= CharacterQuizList.length - 1) {
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
        if (step === CharacterQuizList.length - 1) {
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
      if (result === CharacterQuizList[step].person_answer) {
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

  return (
    <div className={styles.background}>
      {isAnswerShown ? (
        <div className={styles.result}>
          <h1>정답은 {CharacterQuizList[step].person_answer} 입니다.</h1>
        </div>
      ) : (
        <img
          alt="img"
          src={CharacterQuizList[step].image_url}
          className={styles.img}
        />
      )}

      {/* <div>{CharacterQuizList[step].person_no}</div> */}
    </div>
  );
}

export default CharacterQuiz;
