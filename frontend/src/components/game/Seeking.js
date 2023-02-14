import React, { useEffect, useState, useRef } from "react";
import styles from "./Seeking.module.css";
import * as tmImage from "@teachablemachine/image";

const URL = "https://storage.googleapis.com/tm-model/zoWX1cbTi/";
function Seeking({
  start,
  result,
  setResult,
  openvidu,
  host,
  setEnd,
  setStart,
}) {
  console.log("setend", setEnd);
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [label, setLabel] = useState("");
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
    console.log(start)
    if (!model && !webcam && !start) {
      return
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
  }, [webcam, start]);

  const loop = async () => {
    webcam.update();
      await predict();
      requestAnimationFrame(loop);
  };
  const predict = async () => {
    if (!start) {
      return;
    }
    const prediction = await model.predict(webcam.canvas);
    let max = 0;
    let highlabel = "Default";
    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability.toFixed(2) > max) {
        max = prediction[i].probability.toFixed(2);
        highlabel = prediction[i].className;
      }
    }
    setLabel(highlabel);
    console.log(start);
    if (highlabel === "Rock" && start) {
      const data = {
        userNo: openvidu.userNo,
        score: -5,
      };
      openvidu.session.signal({
        data: JSON.stringify(data),
        type: "TrueAnswer",
      });
      setStart(false)
    }
  };

  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [fail, setfail] = useState(null);
  // 임시

  useEffect(() => {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      console.log("끝")
      setIsAnswerShown(true);
      setfail(data.userNo);
      setEnd(true);
      setStart(false);
      console.log("dho dksajacna",start)
    });
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
    openvidu.session.on("signal:GameRestart", () => {
      setEnd(false);
      setIsAnswerShown(false)
    });
    return () => {      
      openvidu.session.off("signal:TrueAnswer");
      openvidu.session.off("signal:GameRestart");
    }
  }, []);

  return (
    <div className={styles.background}>
      <div id="label-container">
        {label === "Rock"? label:null}
        <div />
        {isAnswerShown ? (
          <div className={styles.result}>
            <h1>당첨자 : {fail}</h1>
          </div>
        ) : null}
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
