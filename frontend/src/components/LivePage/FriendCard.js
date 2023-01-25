import styles from "./FriendCard.module.css";

const FriendCard = ({ userLevelImageUrl, userLevelName }) => {
  return (
    <div className={styles.frameWrapper}>
      <div className={styles.vectorParent}>
        <img className={styles.vectorIcon} alt="" src={userLevelImageUrl} />
        <div className={styles.lv3}>{userLevelName}</div>
        <div className={styles.onlineParent}>
          <div className={styles.online}>Online</div>
          <img className={styles.groupChild} alt="" src="../ellipse-21.svg" />
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
