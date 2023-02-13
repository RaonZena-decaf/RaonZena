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
    if (start) {
      await predict();
      requestAnimationFrame(loop);
    }
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
    setLabel(highlabel);
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
  const [fail, setfail] = useState(null);
  // 임시
  
  useEffect(() => {
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
  }, []);

  return isAnswerShown ? (
    <div className={styles.result}>
      <h1>당첨자 : {fail}</h1>
    </div>
  ) : (
    <div className={styles.background}>
      <div id="label-container">
        {label}
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
