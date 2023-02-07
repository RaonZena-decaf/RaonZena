import { CharacterQuizList } from "./CharacterQuizList";
import React, { useEffect, useState } from "react";
import styles from "./CharacterQuiz.module.css";

function CharacterQuiz({ start, result, setResult, openvidu }) {
  console.log(start)
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // console.log(result);

  // const resultcheck =() => {
  //   {result === CharacterQuizList[0].person_answer ? console.log("정답입니다.") : console.log("틀렸습니다.")}
  // }
  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data)
      console.log(data.correct)
      clearTimeout(questioning)
    })
  }
  const questioning = setTimeout((characterimg) => {
    setShowAnswer(true)
    if (step >= CharacterQuizList.length -1) {
      return;
    }
  },3000)
  const showing = setTimeout((resultimg) => {
    setStep(prev => prev+1)
    setShowAnswer(false)
  },1000)
  useEffect(() => {
    if (start) {
      questioning()
      showing()
    }
  }, [start, step]);

  // useEffect(() => {
  //   result === CharacterQuizList[step].person_answer
  //     ? console.log("정답")
  //     : console.log("오답");
  //   setResult("");
  // }, [result]);

  useEffect(() => {
    if (result !== "") {
      if (result === CharacterQuizList[step].person_answer) {
        console.log("정답");
        const data = {
          correct : openvidu.userName
        }
        openvidu.session.signal({
          data: JSON.stringify(data),
          type: "TrueAnswer"
        })
        setResult("");
      } else {
        console.log("오답");
        setResult("");
      }
    }
  }, [result]);

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
