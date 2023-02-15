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
  const timeLimit = 3;

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
          console.log(res.data);
          if (openvidu.session) {
            const data = JSON.stringify(res.data);
            console.log("게임 데이터", data);
            openvidu.session.signal({
              data: data,
              type: "SeedNumber",
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
      openvidu.session.on("signal:SeedNumber", (event) => {
        const data = JSON.parse(event.data);
        setCharacterimg(data);
      });
      openvidu.session.on("signal:GameRestart", () => {
        setStep(0);
        dataAxios();
      });
    }
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
        console.log("정답");
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
        console.log("오답");
        setResult("");
        document.getElementById("wrongMassage").style.display = "block";
        setTimeout(function () {
          document.getElementById("wrongMassage").style.display = "none";
        }, 200);
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
    };
  }, []);
  return (
    <div className={styles.background}>
      <div className={styles.Container}>
        <span className={styles.questionNo}>
          {step + 1} / {characterimg.length}
        </span>
        <span className={styles.TimeLimit}>
          {minutes} : {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
        </span>
      </div>
      <div id="wrongMassage" className={styles.wrongMassage}>
        틀렸습니다
      </div>
      {start ? (
        step === characterimg.length ? (
          <div className={styles.result}>
            <h1>인물퀴즈 끝!!!</h1>
          </div>
        ) : isAnswerShown ? (
          <div className={styles.result}>
            <h1>인물퀴즈 시작합니다!!!</h1>
          </div>
        )}
      </div>
    </div>
  );

  //   return (
  //     // 9번까지 출력후 종료 표시
  //     // <div className={styles.background}>
  //     //   {start ? (
  //     //     characterimg && characterimg.length === step + 1 ? (
  //     //       <div className={styles.result}>
  //     //         <h1>인물퀴즈 끝!!</h1>
  //     //       </div>
  //     //     ) : isAnswerShown ? (
  //     //       <div className={styles.result}>
  //     //         <h1>{characterimg[step].answer}</h1>
  //     //       </div>
  //     //     ) : (
  //     //       characterimg &&
  //     //       characterimg[step] && (
  //     //         <img
  //     //           alt="img"
  //     //           src={characterimg[step].imageUrl}
  //     //           className={styles.img}
  //     //         />
  //     //       )
  //     //     )
  //     //   ) : (
  //     //     <div className={styles.result}>
  //     //       <h1>인물퀴즈 시작합니다!!!</h1>
  //     //     </div>
  //     //   )}
  //     // </div>

  //     // 10번 이미지 나오고 10번 답은 안나오고 끝 표시
  //     // <div className={styles.background}>
  //     //   {start ? (
  //     //     step === characterimg.length - 1 && isAnswerShown ? (
  //     //       <div className={styles.result}>
  //     //         {lastAnswerShown ? (
  //     //           <div>
  //     //             <h1>인물퀴즈 끝!!</h1>
  //     //           </div>
  //     //         ) : (
  //     //           <>
  //     //             <h1>{characterimg[step].answer}</h1>
  //     //             <div>
  //     //               <h1>Exit</h1>
  //     //             </div>
  //     //             {setLastAnswerShown(true)}
  //     //           </>
  //     //         )}
  //     //       </div>
  //     //     ) : isAnswerShown ? (
  //     //       <div className={styles.result}>
  //     //         <h1>{characterimg[step].answer}</h1>
  //     //       </div>
  //     //     ) : (
  //     //       characterimg &&
  //     //       characterimg[step] && (
  //     //         <img
  //     //           alt="img"
  //     //           src={characterimg[step].imageUrl}
  //     //           className={styles.img}
  //     //         />
  //     //       )
  //     //     )
  //     //   ) : (
  //     //     <div className={styles.result}>
  //     //       <h1>인물퀴즈 시작합니다!!!</h1>
  //     //     </div>
  //     //   )}
  //     // </div>

  //   //   <div className={styles.background}>
  //   //     {start ? (
  //   //       step === characterimg.length - 1 && isAnswerShown ? (
  //   //         <div className={styles.result}>
  //   //           <h1>인물퀴즈 끝!!!</h1>
  //   //         </div>
  //   //       ) : isAnswerShown ? (
  //   //         <div className={styles.result}>
  //   //           <h1>{characterimg[step].answer}</h1>
  //   //         </div>
  //   //       ) : (
  //   //         characterimg &&
  //   //         characterimg[step] && (
  //   //           <img
  //   //             alt="img"
  //   //             src={characterimg[step].imageUrl}
  //   //             className={styles.img}
  //   //           />
  //   //         )
  //   //       )
  //   //     ) : (
  //   //       <div className={styles.result}>
  //   //         <h1>인물퀴즈 시작합니다!!!</h1>
  //   //       </div>
  //   //     )}
  //   //   </div>
  //   // );

  //   //   <div className={styles.background}>
  //   //     {start ? (
  //   //       isAnswerShown ? (
  //   //         <div className={styles.result}>
  //   //           <h1>{characterimg[step].answer}</h1>
  //   //         </div>
  //   //       ) : (
  //   //         characterimg &&
  //   //         characterimg[step] && (
  //   //           <img
  //   //             alt="img"
  //   //             src={characterimg[step].imageUrl}
  //   //             className={styles.img}
  //   //           />
  //   //         )
  //   //       )
  //   //     ) : (
  //   //       <div className={styles.result}>
  //   //         <h1>인물퀴즈 시작합니다!!!</h1>
  //   //       </div>
  //   //     )}
  //   //   </div>
  //   // );

  //   // return (
  //   //   <div className={styles.background}>
  //   //     {isAnswerShown ? (
  //   //       <div className={styles.result}>
  //   //         <h1>정답은 {characterimg[step].answer} 입니다.</h1>
  //   //       </div>
  //   //     ) : (
  //   //       characterimg &&
  //   //       characterimg[step] && (
  //   //         <img
  //   //           alt="img"
  //   //           src={characterimg[step].imageUrl}
  //   //           className={styles.img}
  //   //         />
  //   //       )
  //   //     )}
  //   //   </div>
  //   // );
}

export default CharacterQuiz;
