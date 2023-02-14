import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  dispatch,
} from "react";
import styles from "../game/ShoutInSilence.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import GameOverModal from "./GameOverModal";

function ShoutInSilence({
  start,
  result,
  setResult,
  host,
  openvidu,
  userList,
  closeMenu,
}) {
  const timeLimit = 5; // 게임 제한 시간

  const [step, setStep] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [answer, setAnswer] = useState("");
  const baseUrl = useSelector((store) => store.baseUrl);
  const videoRef = useRef(null);
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [answerList, setAnswerList] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {}, 300);
  };

  // 세션 값이 있으면 해당 시그널(TrueAnswer)에 대한 밑에 있는 함수 실행
  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setIsAnswerShown(true);
    });
  }

  const handleVideo = () => {
    const video = videoRef.current;
  };

  const answerOnclick = (e) => {
    e.preventDefault();
    if (answer !== "") {
      console.log(answer);
    }
    setAnswer("");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //axios로 정답 리스트 가져오는 부분
  function getAnswerList() {
    if (true) {
      axios({
        method: "get",
        // url: `${baseUrl}games/gameType/3`,
        url: "http://localhost:8081/api/v1/games/gameType/3",
      })
        .then((res) => {
          console.log("고요속의 외침 정답 가져온 전체 결과 =>", res.data);
          setAnswerList(res.data);
          if (openvidu.session) {
            const data = JSON.stringify(res.data);
            console.log("게임 데이터", data);
            openvidu.session.signal({
              data: data,
              type: "SeedNumber",
            });
          }
        })
        .catch((error) => console.log(error));
    }
  }

  // 정답 체크 기능
  useEffect(() => {
    if (start && step <= answerList.length - 1) {
      // 시간이 남았는데 정답을 못맞춘 경우
      if (timeRemaining > 0 && !isAnswerShown) {
        //
        const intervalId = setInterval(() => {
          setTimeRemaining(timeRemaining - 1);
        }, 1000);
        return () => clearInterval(intervalId);
      }
      // 제한 시간이 끝난 후 정답을 못맞춘 경우
      if (timeRemaining === 0 && !isAnswerShown) {
        setIsAnswerShown(true);
      }

      //정답을 맞춘 경우
      if (isAnswerShown) {
        //마지막 문제인 경우
        if (step === answerList.length - 1) {
          setIsAnswerShown(true);
          // 더 할 것인지 아닌지 확인

          setShowModal(true);
          return;
        } else {
          const timeoutId = setTimeout(() => {
            setIsAnswerShown(false);
            setTimeRemaining(timeLimit);
            setStep((prev) => (prev += 1));
          }, 1000);
          return () => clearTimeout(timeoutId);
        }
      }
    }
  }, [start, timeRemaining, isAnswerShown]);

  useEffect(() => {
    if (host === false) {
      if (result !== "") {
        //정답 맞춘 로직
        if (result === answerList[step].answer) {
          console.log("정답");
          // setModalShow(true);
          document.getElementById("correctMassage").style.display = "block";
          setTimeout(function () {
            document.getElementById("correctMassage").style.display = "none";
          }, 200);

          const data = {
            userNo: openvidu.userNo,
            score: 5,
          };
          openvidu.session.signal({
            data: JSON.stringify(data),
            type: "TrueAnswer",
          });
          setResult("");
        }
        //틀린 로직
        else {
          console.log("오답");
          setResult("");
          document.getElementById("wrongMassage").style.display = "block";
          setTimeout(function () {
            document.getElementById("wrongMassage").style.display = "none";
          }, 200);
        }
      }
    }
  }, [result]);

  useEffect(() => {
    const video = openvidu.publisher;
    video.addVideoElement(videoRef.current);
  }, []);

  useEffect(() => {
    getAnswerList();
  }, []);

  if (openvidu.session) {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      setIsAnswerShown(true);
    });
    openvidu.session.on("signal:SeedNumber", (event) => {
      const data = JSON.parse(event.data);
      setAnswerList(data);
    });
    openvidu.session.on("signal:GameRestart", () => {
      setStep(0);
      getAnswerList();
    });
  }

  return (
    <div>
      <div id="wrongMassage" className={styles.wrongMassage}>
        틀렸습니다
      </div>
      <div id="correctMassage" className={styles.correctMassage}>
        맞았습니다
      </div>
      <div className={styles.webcamCapture}>
        {videoRef.current !== undefined ? (
          <video autoPlay={true} ref={videoRef} width="80%" />
        ) : null}
        <div className={styles.Container}>
          <span className={styles.questionNo}>
            {step + 1} / {answerList.length}
          </span>
          <span className={styles.TimeLimit}>
            {" "}
            {minutes} :{" "}
            {timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
          </span>
          {answerList.length > 0 ? (
            <span className={styles.AnswerFont}>
              정답 : {answerList[step].answer.replace(/[a-zA-Z0-9가-힣]/g, "O")}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default React.memo(ShoutInSilence);
