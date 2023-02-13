import styles from "./GameFrameProgress.module.css";

function GameFrameProgress(props) {
  return (
    <div className={styles.progressbar}>
      <div
        style={{
          height: "100%",
          width: `${props.user.points}%`,
          backgroundColor: "#a66cff",
          transition: "width 0.5s",
        }}
      >
        <span className={styles.progressPercent}>{props.user.points}%</span>
      </div>
    </div>
  );
}

export default GameFrameProgress;
