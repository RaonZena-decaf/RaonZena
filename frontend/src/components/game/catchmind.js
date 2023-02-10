import React, { useRef, useState, useEffect } from "react";
import style from "../game/catchmind.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

function Catchmind({ start, result, setResult, openvidu }) {
  const paletteRef = useRef(null);
  const canvasRef = useRef(null);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [QuizList, setQuizList] = useState([])
  useEffect(() => {
    if (openvidu && openvidu.session) {
      openvidu.session.on("signal:CanvasDraw", (event) => {
        axios({
          method: "get",
          url: `${baseUrl}games/1/catchMind`,
        })
          .then((res) => {
            console.log(res.data);
            const image = new Image();
            image.src = res.data;
            image.onload = function () {
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            };
          })
          .catch((error) => console.log("following List 에러: ", error));
      });
    }
    // 게임 데이터 통신
    // axios({
    //   method: "get",
    //   url: `${baseUrl}games/1/catchMind`,
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //     const image = new Image();
    //     image.src = res.data;
    //     image.onload = function () {
    //       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //     };
    //   })
    //   .catch((error) => console.log("following List 에러: ", error));
    
    const canvas = canvasRef.current;
    
    const ctx = canvas.getContext("2d");

    canvas.style.margin = "20px";
    canvas.style.border = "3px double";
    canvas.style.cursor = "pointer";
    const height = canvas.height;
    const width = canvas.width;
    let painting = false;

    function stopPainting(event) {
      painting = false;

      const dataURL = canvas.toDataURL();
      //axios 통신 어케하죠?
      //axios 통신해서 백으로 dataURL보내주기
      axios({
        method: "post",
        url: `${baseUrl}games/1/catchMind`,
        data: dataURL,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log("following List 에러: ", error));
      if (openvidu.session) {
        openvidu.session.signal({
          type: "CanvasDraw",
        });
      }

      // axios 통신해서 백에서 dataURL 받아오기
      // dataURL = 받아와서
    }

    function startPainting(event) {
      painting = true;
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

    document.querySelector(".clear").onclick = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
    };

    document.querySelector(".fill").onclick = () => {
      ctx.fillStyle = lineColor;
      ctx.fillRect(0, 0, width, height);
    };
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
    let lineColor = "black";

    buttons.forEach((content) => {
      let button = document.querySelector(`.${content}`);
      button.style.cursor = "pointer";

      if (content === "clear" || content === "fill") {
        button.style.background = "rgba(100,100,100,0.2)";
      } else {
        button.style.background = content;
      }
      button.style.color = "white";
      button.style.display = "inline-block";
      button.style.textShadow =
        "1px 0 black, 0 1px black, 1px 0 black, 0 -1px gray";
      button.style.lineHeight = "40px";
      button.style.textAlign = "center";
      button.style.width = "50px";
      button.style.height = "50px";
      button.style.borderRadius = "25px";
      button.style.border = "4px solid rgba(129, 101, 101, 0.151)";
      button.style.boxShadow = "1px 2px 2px gray";
      button.style.marginBottom = "10px";

      button.onclick = () => {
        ctx.strokeStyle = content;
        lineColor = content;
      };
    });
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
  }, []);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (start && step <= QuizList.length - 1) {
      if (timeRemaining > 0 && !isAnswerShown) {
        const intervalId = setInterval(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 100);
        return () => clearInterval(intervalId);
      }
      if (timeRemaining === 0 && !isAnswerShown) {
        setIsAnswerShown(true);
      }
      if (isAnswerShown) {
        if (step === QuizList.length - 1) {
          setIsAnswerShown(true);
          return;
        } else {
          setTimeout(() => {
            setIsAnswerShown(false);
            setTimeRemaining(3);
            setStep((prev) => (prev += 1));
          }, 100);
        }
      }
    }
  }, [start, timeRemaining, isAnswerShown]);

  useEffect(() => {
    if (result !== "") {
      if (result === QuizList[step].person_answer) {
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
    <div>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div id="palette" ref={paletteRef}>
        <span className="red">red</span>
        <span className="yellow">yellow</span>
        <span className="orange">orange</span>
        <span className="green">green</span>
        <span className="blue">blue</span>
        <span className="navy">navy</span>
        <span className="purple">purple</span>
        <span className="black">black</span>
        <span className="white">white</span>
        <span className="clear">clear</span>
        <span className="fill">fill</span>
      </div>
    </div>
  );
}

export default Catchmind;
