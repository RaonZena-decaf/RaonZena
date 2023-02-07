import { CharacterQuizList } from "./CharacterQuizList";
import React, { useEffect, useState, useRef } from "react";
import styles from "./CharacterQuiz.module.css";
const YOUR_API_KEY = "AIzaSyBAijqtvFdcOvI05NGyyZS61zek7wqNDVw";
function Seeking({ start, result, setResult, openvidu }) {
  const [step, setStep] = useState(0);
  const videoRef = useRef(null);
  const [analysis, setAnalysis] = useState(null);

  const handleVideo = async () => {
    const video = videoRef.current;
    const videoBlob = new Blob([new Uint8Array(await video.arrayBuffer)]);
    const formData = new FormData();
    formData.append("requests", videoBlob);
    const callGoogleVIsionApi = async (base64) => {
      let url = "https://vision.googleapis.com/v1/images:annotate" + YOUR_API_KEY;
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: formData,
              },
              features: [
                { type: 'LABEL_DETECTION', maxResults: 10 },
                { type: 'TEXT_DETECTION', maxResults: 5 },
                { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
                { type: 'WEB_DETECTION', maxResults: 5 },
              ],
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setAnalysis(
            data.responses[0].fullTextAnnotation.text,
          );
          console.log(data.responses[0].fullTextAnnotation.text)
        })
        .catch((err) => console.log('error : ', err));
        callGoogleVIsionApi()
    };

    // try {
    //   const response = await axios.post(
    //     "https://vision.googleapis.com/v1/images:annotate",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: `Bearer ${YOUR_API_KEY}`,
    //       },
    //     }
    //   );
    //   setAnalysis(response.data);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
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
      {isAnswerShown ? (
        <div className={styles.result}>
          <h1>정답은 {CharacterQuizList[step].person_answer} 입니다.</h1>
        </div>
      ) : (
        <img
          alt="img"
          src={CharacterQuizList[step].image_url}
          className={styles.img}
        />
      )}
      <video
        autoPlay={true}
        ref={videoRef}
        width="100%"
        height="100%"
        onPlay={handleVideo}
      />
      {analysis && <pre>{JSON.stringify(analysis, null, 2)}</pre>}
    </div>
  );
}

export default Seeking;
