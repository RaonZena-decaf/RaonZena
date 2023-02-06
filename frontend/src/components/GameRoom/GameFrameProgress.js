import styles from "./GameFrameProgress.module.css";

function GameFrameProgress(props) {
  // console.log("asdasd", props.people);
  return (
    <div className={styles.progressbar}>
      <div
        style={{
          height: "100%",
          width: `${props.people.points}%`,
          backgroundColor: "#a66cff",
          transition: "width 0.5s",
        }}
      >
        <span className={styles.progressPercent}>{props.people.points}%</span>
      </div>
    </div>
  );
}

export default GameFrameProgress;
