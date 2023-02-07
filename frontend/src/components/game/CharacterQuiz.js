import { CharacterQuizList } from "./CharacterQuizList";
import React, { useEffect, useState } from "react";
import styles from "./CharacterQuiz.module.css";

function CharacterQuiz({ start, result, setResult }) {
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // console.log(result);

  // const resultcheck =() => {
  //   {result === CharacterQuizList[0].person_answer ? console.log("정답입니다.") : console.log("틀렸습니다.")}
  // }

  useEffect(() => {
    if (start) {
      setTimeout(() => {
        setShowAnswer(true);
        if (step >= CharacterQuizList.length - 1) {
          return;
        }
        setTimeout(() => {
          setStep((prev) => prev + 1);
          setShowAnswer(false);
        }, 1000);
      }, 3000);
    }
  }, [start, step]);

  return (
    <div className={styles.background}>
      {showAnswer ? (
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
