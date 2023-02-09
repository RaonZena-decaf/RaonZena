import { CharacterQuizList } from "./CharacterQuizList";
import React, { useEffect, useState, useRef } from "react";
import styles from "./CharacterQuiz.module.css";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const URL = "https://storage.googleapis.com/tm-model/zoWX1cbTi/";
function Seeking({ start, result, setResult, openvidu }) {
  const [step, setStep] = useState(0);
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(false);
  const [maxPredictions, setMaxPredictions] = useState(null);
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
      webcam.setup();
      webcam.play();
      requestAnimationFrame(loop);
    }
  }, [webcam]);
  // useEffect(() => {
  //   const setupWebcam = async () => {
  //     if (!model) return;

  //     const newWebcam = new tmImage.Webcam(200, 200, true);
  //     await newWebcam.setup();
  //     await newWebcam.play();
  //     setWebcam(newWebcam);
  //     window.requestAnimationFrame(loop);
  //   };

  //   setupWebcam();
  // }, [model]);

  const loop = async () => {
    webcam.update();
    await predict();
    requestAnimationFrame(loop);
  };

  const predict = async () => {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      document.getElementById("label-container").childNodes[i].innerHTML =
        classPrediction;
    }
  };

  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setIsAnswerShown(true);
    });
  }
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3);

  useEffect(() => {
    if (start && step <= CharacterQuizList.length - 1) {
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
        if (step === CharacterQuizList.length - 1) {
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
      if (result === CharacterQuizList[step].person_answer) {
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
  useEffect(() => {
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
  }, []);

  return (
    <div className={styles.background}>
      <div id="label-container">
        {Array.from({ length: maxPredictions }).map((_, i) => (
          <div key={i} />
        ))}
      </div>

      <video autoPlay={true} ref={videoRef} width="100%" height="100%" />
    </div>
  );
}

export default Seeking;
