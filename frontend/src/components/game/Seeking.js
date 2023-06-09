import React, { useEffect, useState, useRef } from "react";
import styles from "./Seeking.module.css";
import * as tmImage from "@teachablemachine/image";
import { useSelector } from "react-redux";

const URL = "https://storage.googleapis.com/tm-model/zoWX1cbTi/";
function Seeking({ start, openvidu, setEnd, setStart }) {
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(null);
  const [label, setLabel] = useState("");
  let box = [];
  const userName = useSelector((store) => store.userData.userName);
  const gamestop = useRef(false);
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
    if (!model || !webcam || gamestop.current) {
      return;
    } else {
      const steps = new Promise((resolve, reject) => {
        webcam.setup();
        resolve(webcam.setup());
      });
      steps.then(() => {
        webcam.play();
        animationRef.current = requestAnimationFrame(loop);
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
      animationRef.current = requestAnimationFrame(loop);
    }
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
    if (highlabel === "Rock" && !gamestop.current) {
      box.push(highlabel);
      if (box.length > 10) {
        gamestop.current = true;
        const data = {
          userNo: openvidu.userNo,
          score: -5,
          username: userName,
        };
        openvidu.session.signal({
          data: JSON.stringify(data),
          type: "TrueAnswer",
        });
        setStart(false);
        cancelAnimationFrame(animationRef.current);
        box = []
      }
    } else {
      box = [];
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
      setIsAnswerShown(true);
      setfail(data.username);
      setEnd(true);
      setStart(false);
    });
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
    openvidu.session.on("signal:GameRestart", () => {
      setEnd(false);
      gamestop.current = false;
      setIsAnswerShown(false);
    });
    // return () => {
    //   openvidu.session.off("signal:TrueAnswer");
    //   openvidu.session.off("signal:GameRestart");
    // };
  }, []);

  return (
    <div className={styles.background}>
      <div id="label-container" className={styles.result}>
        {label === "Rock" ? (
          <div className={styles.animation}>탈락위기!</div>
        ) : null}
        {isAnswerShown ? (
          <>
            <div className={styles.animation}>탈락자 : {fail}</div>
          </>
        ) : null}
      </div>
      <video autoPlay={true} ref={videoRef} width="90%" height="90%" />
    </div>
  );
}

export default Seeking;
