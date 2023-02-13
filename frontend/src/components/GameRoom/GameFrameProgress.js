import styles from "./GameFrameProgress.module.css";
import { useState, useEffect } from "react";

function GameFrameProgress(props) {
  const [exp, setExp] = useState(props.user.exp);

  useEffect(() => {
    setExp(props.user.exp);
  }, [props.user.exp]);

  return (
    <div className={styles.progressbar}>
      <div
        style={{
          height: "100%",
          width: `${exp}%`,
          backgroundColor: "#a66cff",
          transition: "width 0.5s",
        }}
      >
        <span className={styles.progressPercent}>{exp}%</span>
      </div>
    </div>
  );
}

export default GameFrameProgress;
