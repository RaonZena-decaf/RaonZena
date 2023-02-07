import { CharacterQuizList } from "./CharacterQuizList";
import React, { useEffect, useState } from "react";
import styles from "./CharacterQuiz.module.css";

function CharacterQuiz({ start }) {
  const [step, setStep] = useState(0);
  //   useEffect(() => {
  //     if (start) {
  //       setTimeout(() => {
  //         for (let i = 0; i < CharacterQuizList.length - 1; i++) {
  //           console.log(i);
  //           setStep(step + 1);
  //         }
  //       }, 1000);
  //     }
  //   }, [step, start]);

  useEffect(() => {
    if (start) {
      if (step >= CharacterQuizList.length - 1) {
        return;
      }
      setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 2000);
    }
  }, [start, step]);

  return (
    <div className={styles.background}>
      <img
        alt="img"
        src={CharacterQuizList[step].image_url}
        className={styles.img}
      />
      {/* <div>{CharacterQuizList[step].person_no}</div> */}
    </div>
  );
}

export default CharacterQuiz;
