import React, { useRef, useState, useEffect } from "react";
import styles from "../game/catchmind.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaFillDrip, FaRegTrashAlt } from "react-icons/fa";

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
  console.log("catchmind", start);
  const timeLimit = 10;
  const paletteRef = useRef(null);
  const canvasRef = useRef(null);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [QuizList, setQuizList] = useState([]);
  console.log("출제 문제", QuizList);
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
    let lineColor = "black";
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
    const height = canvas.height;
    const width = canvas.width;

    const ctx = canvas.getContext("2d");
    canvas.style.margin = "10px 0px 0px 0px";
    canvas.style.border = "3px";
    canvas.style.cursor = "pointer";
    canvas.style.height = height * 2.8 + "px";
    canvas.style.width = width * 2.6 + "px";
    // canvas.style.borderImage = "linear-gradient(to right, #9D00F1 0%, #f400b0 100%)";
    // canvas.style.borderImageSlice = "2";

    document.querySelector(".clear").onclick = (e) => {
      e.preventDefault();
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
    };

    document.querySelector(".fill").onclick = (e) => {
      e.preventDefault();
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
      } else {
        painting = false;
      }
    }

    ctx.lineWidth = 2;
    function onMouseMove(event) {
      const x = (event.clientX - canvas.offsetLeft) / 2.5;
      const y = (event.clientY - canvas.offsetTop) / 2;
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

    //호스트가 아니면 alert 출력
    if (host === false) {
      canvas.addEventListener("click", (e) => {
        e.preventDefault();
        alert("방장만 출제 가능합니다");
      });
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
        button.style.background = "";
      } else {
        button.style.backgroundImage = `url(../PaletteImg/${content}.png)`;
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

      if (content === "clear" || content === "fill") {
        return;
      }
      button.onclick = () => {
        ctx.strokeStyle = content;
        lineColor = content;
      };
    });
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
  }, []);

  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);

  const [step, setStep] = useState(0);
  useEffect(() => {
    const reset = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const height = canvas.height;
      const width = canvas.width;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
    };

    if (start && step < QuizList.length) {
      if (timeRemaining > 0 && !isAnswerShown) {
        const intervalId = setInterval(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      } else {
        if (step === QuizList.length - 1) {
          setIsAnswerShown(true);
          reset();
        } else {
          setTimeout(() => {
            setIsAnswerShown(false);
            setTimeRemaining(timeLimit);
            setStep((prev) => prev + 1);
            reset();
          }, 1000);
        }
      }
    }
    if (step >= QuizList.length) {
      setIsAnswerShown(false);
      setTimeRemaining(timeLimit);
      setStart(false);
    }
  }, [start, step, timeRemaining, isAnswerShown]);

  useEffect(() => {
    if (result !== "" && step < QuizList.length) {
      if (result === QuizList[step].answer) {
        console.log("정답");
        const data = {
          userNo: openvidu.userNo,
          score: 15,
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
  // 시간초 관련 계산
  const [minutes, setMinutes] = useState(0);

  return (
    <div className={styles.Background}>
      <div className={styles.Container}>
        <span className={styles.questionNo}>
          단계 {step + 1} / {QuizList.length}
        </span>
        <span className={styles.TimeLimit}>
          시간 {minutes} :{" "}
          {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
        </span>
        {(host || isAnswerShown) && QuizList.length > 0 ? (
          <span className={styles.AnswerFont}>
            단어 : {QuizList[step].answer}
          </span>
        ) : null}
      </div>{" "}
      <div id="wrongMassage" className={styles.wrongMassage}>
        틀렸습니다
      </div>
      <canvas className={styles.canvas} id="canvas" ref={canvasRef}></canvas>
      <div className={styles.palette} ref={paletteRef}>
        <div className={`${styles.buttonColor} red`}></div>
        <div className={`${styles.buttonColor} orange`}></div>
        <div className={`${styles.buttonColor} yellow`}></div>
        <div className={`${styles.buttonColor} green`}></div>
        <div className={`${styles.buttonColor} blue`}></div>
        <div className={`${styles.buttonColor} navy`}></div>
        <div className={`${styles.buttonColor} purple`}></div>
        <div className={`${styles.buttonColor} black`}></div>
        <div className={`${styles.buttonColor} white`}></div>
        <div className={`${styles.buttonBlack} clear`}>
          <FaRegTrashAlt /> <div className={styles.textWithIcon}>비우기</div>
        </div>
        <div className={`${styles.buttonBlack} fill`}>
          <FaFillDrip /> <div className={styles.textWithIcon}>채우기</div>
        </div>
      </div>
    </div>
  );
}

export default Catchmind;
