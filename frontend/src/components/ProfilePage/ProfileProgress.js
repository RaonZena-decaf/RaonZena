import styles from "./ProfileProgress.module.css";

function ProfileProgress({exp}) {
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
        <span className={styles.progressPercent}>
          {`${exp}%`}
        </span>
      </div>
    </div>
  );
}

export default ProfileProgress;
