import styles from "./GameFrameProgress.module.css";
import { useState, useEffect } from "react";

function GameFrameProgress(props) {
  const [gameScore, setExp] = useState(props.user.gameScore);

  useEffect(() => {
    setExp(props.user.gameScore);
  }, [props.user.gameScore]);

  return (
    <div className={styles.progressbar}>
      <div
        style={{
          height: "100%",
          width: `${gameScore}%`,
          backgroundColor: "#a66cff",
          transition: "width 0.5s ease",
        }}
      >
        <span className={styles.progressPercent}>{gameScore}%</span>
      </div>
    </div>
  );
}

export default GameFrameProgress;
