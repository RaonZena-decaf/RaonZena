import styles from "./GameFrame.module.css";
import React, { useState, useEffect, publisher } from "react";
import GameFrameLeft from "./GameFrameLeft";
import GameFrameRight from "./GameFrameRight";

function GameFrame({ gamename, openvidu, host, subscribes }) {
  const [start, setStart] = useState(false);
  const startHandler = () => {
    setStart(true);
  };

  const [result, setResult] = useState("");
  const [gameTitle, setGameTitle] = useState("");

  useEffect(() => {
    setGameTitle(getGameTitle(gamename));
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
        />
        <GameFrameRight
          start={start}
          startHandler={startHandler}
          setResult={setResult}
          host={host}
          publisher={publisher}
          subscribes={subscribes}
        />
      </div>
    </div>
  );
}

export default GameFrame;
