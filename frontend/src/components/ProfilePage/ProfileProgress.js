import { ProfileUserInfo } from "./ProfileUserInfo";
import styles from "./ProfileProgress.module.css";

function ProfileProgress() {
  return (
    <div className={styles.progressbar}>
      <div
        style={{
          height: "100%",
          width: `${ProfileUserInfo.exp}%`,
          backgroundColor: "#a66cff",
          transition: "width 0.5s",
        }}
      >
        <span className={styles.progressPercent}>
          {`${ProfileUserInfo.exp}%`}
        </span>
      </div>
    </div>
  );
}

export default ProfileProgress;
