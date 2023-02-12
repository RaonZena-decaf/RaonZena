import React, { useEffect, useState, useRef } from "react";
import styles from "./Seeking.module.css";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const URL = "https://storage.googleapis.com/tm-model/zoWX1cbTi/";
function Seeking({ start, result, setResult, openvidu }) {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [label, setLabel] = useState(null);
  const videoRef = useRef(null);
  useEffect(() => {
    const init = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";
      const steps = new Promise(async (resolve, reject) => {
        const newmodel = await Object.freeze(
          tmImage.load(modelURL, metadataURL)
        );
        setModel(newmodel);
        const flip = true;
        const newcam = new tmImage.Webcam(200, 200, flip);
        setWebcam(newcam);
        setTimeout(resolve(newmodel, newcam), 3000);
      });
      steps.then(async (newmodel, newcam) => {
        setMaxPredictions(newmodel.getTotalClasses());
      });
    };
    init();
  }, []);

  useEffect(() => {
    if (!model && !webcam) {
      return;
    } else {
      const steps = new Promise((resolve, reject) => {
        webcam.setup();
        resolve(webcam.setup());
      });
      steps.then(() => {
        webcam.play();
        requestAnimationFrame(loop);
      });
    }
  }, [webcam]);

  const loop = async () => {
    webcam.update();
    await predict();
    requestAnimationFrame(loop);
  };

  const predict = async () => {
    const prediction = await model.predict(webcam.canvas);
    let max = 0;
    let highlabel = undefined;
    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability.toFixed(2) > max) {
        max = prediction[i].probability.toFixed(2);
        highlabel = prediction[i].className;
      }
    }
    document.getElementById("label-container").childNode.innerHTML = highlabel;
    if (highlabel === "rock") {
      const data = {
        correct: openvidu.userName,
      };
      openvidu.session.signal({
        data: JSON.stringify(data),
        type: "TrueAnswer",
      });
    }
  };

  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setIsAnswerShown(true);
      console.log(data);
      setfail(data)
    });
  }
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);
  const [fail, setfail] = useState(null);
  // 임시
  const [QuizList, setQuizList] = useState([]);
  useEffect(() => {
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
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
  }, []);

  return isAnswerShown ? (
    <div className={styles.result}>
      <h1>{fail}</h1>
    </div>
  ) : (
    <div className={styles.background}>
      <div id="label-container">
        <div />
      </div>
      <video autoPlay={true} ref={videoRef} width="100%" height="100%" />
    </div>
  );
}

export default Seeking;

// <div>
//   <div className={styles.webcamCapture}>
//     <video ref={videoRef} width="80%" />
//     <div className={styles.Container}>
//       <span className={styles.TimeLimit}>
//         {" "}
//         {minutes} :{" "}
//         {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
//       </span>
//       <span className={styles.AnswerFont}>
//         {AnswerList[step].answer}
//       </span>
//     </div>
//   </div>
// </div>
// {/* <Transition unmountOnExit in={open} timeout={500}>
//   {(state) => <GameAnswerModal show={state} handleOpen={handleOpen} />}
// </Transition>
// {modalOpen ? { showModal } : {}} */}
// </div>
// );
// }
