import React, { useRef, useState, useEffect } from "react";
import styles from "../game/catchmind.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

function Catchmind({
  start,
  result,
  setResult,
  openvidu,
  host,
  setEnd,
  setStart,
}) {
  // 만약 5개 짜리 리스트로 할꺼면 고요속의 외침으로 변경
  console.log("catchmind", start)
  const timeLimit = 10;
  const paletteRef = useRef(null);
  const canvasRef = useRef(null);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [QuizList, setQuizList] = useState([]);
  const [lineColor, setLineColor] = useState("black");
  console.log("출제 문제", QuizList)
  const dataAxios = () => {
    if (host) {
      axios({
        method: "get",
        url: `${baseUrl}games/gameType/3`,
      })
        .then((res) => {
          console.log(res.data);
          setQuizList(res.data);
          if (openvidu.session) {
            const data = JSON.stringify(res.data);
            console.log("게임 데이터", data);
            openvidu.session.signal({
              data: data,
              type: "SeedNumber",
            });
          }
        })
        .catch((error) => console.log("캐치마인드 문제 에러: ", error));
    }
  };
  useEffect(() => {
    dataAxios();
    if (openvidu.session) {
      openvidu.session.on("signal:TrueAnswer", (event) => {
        const data = JSON.parse(event.data);
        setIsAnswerShown(true);
      });
      openvidu.session.on("signal:SeedNumber", (event) => {
        const data = JSON.parse(event.data);
        setQuizList(data);
      });
      openvidu.session.on("signal:GameRestart", () => {
        setStep(0);
        dataAxios();
      });
    }
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.src = "../music/The Trapezist.mp3";
    audio.play();
    return () => {
      audio.pause();
    };
  }, []);
  // 캐치마인드 그림 부부
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (openvidu.session) {
      openvidu.session.on("signal:CanvasDraw", (event) => {
        const data = JSON.parse(event.data);
        const image = new Image();
        image.src = data.data;
        image.onload = () => {
          ctx.drawImage(image, 0, 0);
        };
      });
    }
    const ctx = canvas.getContext("2d");
    canvas.style.margin = "20px";
    canvas.style.border = "3px double";
    canvas.style.cursor = "pointer";
    const height = canvas.height;
    const width = canvas.width;
    document.querySelector(".clear").onclick = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
    };

    document.querySelector(".fill").onclick = () => {
      ctx.fillStyle = lineColor;
      ctx.fillRect(0, 0, width, height);
    };

    let painting = false;

    function stopPainting(event) {
      painting = false;
      const dataURL = canvas.toDataURL();
      if (openvidu.session) {
        openvidu.session.signal({
          data: JSON.stringify({ data: dataURL }),
          type: "CanvasDraw",
        });
      }
    }

    function startPainting(event) {
      if (host) {
        painting = true;
      }
      else {
        painting = false;
      }
    }

    ctx.lineWidth = 3;
    function onMouseMove(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    if (canvas) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mousedown", startPainting);
      canvas.addEventListener("mouseup", stopPainting);
      canvas.addEventListener("mouseleave", stopPainting);
    }

    const buttons = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "navy",
      "purple",
      "black",
      "white",
      "clear",
      "fill",
    ];

    buttons.forEach((content) => {
      let button = document.querySelector(`.${content}`);
      button.style.cursor = "pointer";

      if (content === "clear" || content === "fill") {
        button.style.background = "rgba(100,100,100,0.2)";
      } else {
        button.style.background = content;
      }
      // button.style.color = "white";
      // button.style.display = "inline-block";
      // button.style.textShadow =
      //   "1px 0 black, 0 1px black, 1px 0 black, 0 -1px gray";
      // button.style.lineHeight = "40px";
      // button.style.textAlign = "center";
      // button.style.width = "50px";
      // button.style.height = "50px";
      // button.style.borderRadius = "25px";
      // button.style.border = "4px solid rgba(129, 101, 101, 0.151)";
      // button.style.boxShadow = "1px 2px 2px gray";
      // button.style.marginBottom = "10px";

      button.onclick = () => {
        ctx.strokeStyle = content;
        setLineColor(content);
      };
    });
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
  }, []);

  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [step, setStep] = useState(0);
  useEffect(() => {
    console.log("catchmind", start, step,)
    if (start && step <= QuizList.length - 1) {
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
        if (step === QuizList.length - 1) {
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
    if (result !== "" && step < QuizList.length) {
      if (result === QuizList[step].answer) {
        console.log("정답");
        const data = {
          userNo: openvidu.userNo,
          score: 15
        };
        openvidu.session.signal({
          data: JSON.stringify(data),
          type: "TrueAnswer",
        });
        setResult("");
      } else {
        const data = {
          sender: openvidu.userName,
          answer: result,
        };
        openvidu.session.signal({
          data: JSON.stringify(data),
          type: "WrongAnswer",
        });
        setResult("");
      }
    }
  }, [result]);
  // 시간초 관련 계산
  const [minutes, setMinutes] = useState(0);

  return (
    <div>
      <div className={styles.Container}>
        <span className={styles.questionNo}>
          {step + 1} / {QuizList.length}
        </span>
        <span className={styles.TimeLimit}>
          {minutes} : {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
        </span>
        {host || isAnswerShown ? (
          <span className={styles.AnswerFont}>
            제시어 : {QuizList[step].answer}
          </span>
        ) : null}
      </div>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div id="palette" ref={paletteRef}>
        <span className={`${styles.buttonColor} red`}></span>
        <span className={`${styles.buttonColor} yellow`}></span>
        <span className={`${styles.buttonColor} orange`}></span>
        <span className={`${styles.buttonColor} green`}></span>
        <span className={`${styles.buttonColor} blue`}></span>
        <span className={`${styles.buttonColor} navy`}></span>
        <span className={`${styles.buttonColor} purple`}></span>
        <span className={`${styles.buttonColor} black`}></span>
        <span className={`${styles.buttonColor} white`}></span>
        <span className={`${styles.buttonBlack} clear`}>
          clear
        </span>
        <span className={`${styles.buttonBlack} fill`} >
          fill
        </span>
      </div>
    </div>
  );
}

export default Catchmind;
