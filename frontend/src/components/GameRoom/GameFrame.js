import styles from "./GameFrame.module.css";
import React, { useState, useEffect } from "react";
import GameFrameLeft from "./GameFrameLeft";
import GameFrameRight from "./GameFrameRight";
import MenuBar from "../room/MenuBar";

function GameFrame() {
  const [start, setStart] = useState(false);
  const startHandler = () => {
    setStart(true);
  };
  const [result, setResult] = useState("");
  return (
    <div className={styles.container}>
      <h1 className={styles.font}>인물퀴즈</h1>
      <div className={styles.container2}>
        <GameFrameLeft start={start} result={result} setResult={setResult} />
        <GameFrameRight
          start={start}
          startHandler={startHandler}
          setResult={setResult}
        />
      </div>
      <MenuBar />
    </div>
  );
}

export default GameFrame;
