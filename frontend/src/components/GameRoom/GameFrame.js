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
  return (
    <div className={styles.container}>
      <h1 className={styles.font}>인물퀴즈</h1>
      <div className={styles.container2}>
        <GameFrameLeft start={start} />
        <GameFrameRight start={start} startHandler={startHandler} />
      </div>
      <MenuBar />
    </div>
  );
}

export default GameFrame;
