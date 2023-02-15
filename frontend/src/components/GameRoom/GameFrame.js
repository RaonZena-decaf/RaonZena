import styles from "./GameFrame.module.css";
import React, { useState, useEffect } from "react";
import GameFrameLeft from "./GameFrameLeft";
import GameFrameRight from "./GameFrameRight";

function GameFrame({
  gamename,
  openvidu,
  host,
  subscribes,
  roomNo,
  newGameScore,
  setNewGameScore,
  userList,
  setUserList,
  mic,
  toggleDevice,
}) {
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  console.log("EndGame", end, start);
  const startHandler = () => {
    setStart(true);
    if (openvidu.session) {
      openvidu.session.signal({
        data: JSON.stringify({ start: "start" }),
        type: "StartGame",
      });
    }
  };
  useEffect( () => {
    if (openvidu.session) {
      openvidu.session.on("signal:StartGame", () => {
        setStart(true);
      });
      openvidu.session.on("signal:GameRestart", () => {
        startHandler();
        setEnd(false);
      });
    }
  })
  const [result, setResult] = useState("");
  const [gameTitle, setGameTitle] = useState("");

  useEffect(() => {
    setGameTitle(getGameTitle(gamename));
    setStart(false)
    setEnd(false);
  }, [gamename]);
  
  const getGameTitle = (gamename) => {
    let tempTitle = "";
    switch (gamename) {
      case "imagetheme":
        tempTitle = "이미지 게임";
        break;

      case "objectfast":
        tempTitle = "방안의 보물 찾기";
        break;

      case "catchmind":
        tempTitle = "캐치 마인드";
        break;

      case "talkingsilence":
        tempTitle = "고요 속의 외침";
        break;

      case "personquiz":
        tempTitle = "인물 퀴즈";
        break;

      case "joker":
        tempTitle = "역전의 한 방!";
        break;

      default:
        break;
    }
    return tempTitle;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.font}> {gameTitle} </h1>
      <div className={styles.container2}>
        <GameFrameLeft
          start={start}
          result={result}
          setResult={setResult}
          gamename={gamename}
          openvidu={openvidu}
          host={host}
          roomNo={roomNo}
          setEnd={setEnd}
          setStart={setStart}
          subscribes={subscribes}
          newGameScore={newGameScore}
          setNewGameScore={setNewGameScore}
          userList={userList}
          setUserList={setUserList}
          mic={mic}
          toggleDevice={toggleDevice}
        />
        <GameFrameRight
          start={start}
          startHandler={startHandler}
          setResult={setResult}
          gamename={gamename}
          host={host}
          subscribes={subscribes}
          roomNo={roomNo}
          openvidu={openvidu}
          setStart={setStart}
          end={end}
        />
      </div>
    </div>
  );
}

export default GameFrame;
