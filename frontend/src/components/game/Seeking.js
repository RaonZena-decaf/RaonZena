import React, { useEffect, useState, useRef } from "react";
import styles from "./Seeking.module.css";
import * as tmImage from "@teachablemachine/image";

const URL = "https://storage.googleapis.com/tm-model/zoWX1cbTi/";
function Seeking({
  start,
  openvidu,
  setEnd,
  setStart,
}) {
  console.log("setend", setEnd);
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [label, setLabel] = useState("");
  const gamestop = useRef(false)
  const videoRef = useRef(null);
  const animationRef = useRef(null);
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
    console.log(start);
    if (!model || !webcam || gamestop.current) {
      return;
    } else {
      const steps = new Promise((resolve, reject) => {
        webcam.setup();
        resolve(webcam.setup());
      });
      steps.then(() => {
        webcam.play();
        animationRef.current = requestAnimationFrame(loop)
      });
    }
  }, [start]);
  const loop = async () => {
    if (gamestop.current || !start) {
      return;
    }
    webcam.update();
    await predict();
    if (!gamestop.current) {
      animationRef.current = requestAnimationFrame(loop)
    }
  };
  const predict = async () => {
    if (!start) {
      console.log("방지", start);
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
    if (highlabel === "Rock" && !gamestop.current) {
      console.log("high")
      gamestop.current = true
      console.log("멈춰", gamestop.current);
      const data = {
        userNo: openvidu.userNo,
        score: -5,
      };
      openvidu.session.signal({
        data: JSON.stringify(data),
        type: "TrueAnswer",
      });
      setStart(false);
      cancelAnimationFrame(animationRef.current)
    }
  };
  useEffect(() => {
    setStart(false);
  }, [start, gamestop]);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [fail, setfail] = useState(null);
  // 임시

  useEffect(() => {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      console.log("끝");
      setIsAnswerShown(true);
      setfail(data.userNo);
      setEnd(true);
      setStart(false);
      console.log("dho dksajacna", start);
    });
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
    openvidu.session.on("signal:GameRestart", () => {
      setEnd(false);
      gamestop.current = false
      setIsAnswerShown(false);
    });
    return () => {
      openvidu.session.off("signal:TrueAnswer");
      openvidu.session.off("signal:GameRestart");
    };
  }, []);

  return (
    <div className={styles.background}>
      <div id="label-container">
        {label === "Rock" ? label : null}
        <div />
        {isAnswerShown ? (
          <div className={styles.result}>
            <h1>당첨자 : {fail}</h1>
          </div>
        ) : null}
      </div>
      <video autoPlay={true} ref={videoRef} width="90%" height="90%" />
    </div>
  );
}

export default Seeking;
