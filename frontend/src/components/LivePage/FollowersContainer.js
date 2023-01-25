import FriendCard from "../LivePage/FriendCard";
import styles from "./FollowersContainer.module.css";

const FollowersContainer = () => {
  return (
    <div className={styles.parent}>
      <b className={styles.b}>
        <span>{`당신의 `}</span>
        <span className={styles.span}>팔로잉</span>
      </b>
      <FriendCard
        userLevelImageUrl="../vector.svg"
        userLevelName="Lv 3 친구 유저 명"
      />
      <FriendCard
        userLevelImageUrl="../vector1.svg"
        userLevelName="Lv 12 친구 유저 명"
      />
      <FriendCard
        userLevelImageUrl="../vector2.svg"
        userLevelName="Lv 33 친구 유저 명"
      />
      <div className={styles.frameWrapper}>
        <div className={styles.vectorParent}>
          <img className={styles.vectorIcon} alt="" src="../vector3.svg" />
          <div className={styles.lv9}>Lv 9 친구 유저 명</div>
        </div>
      </div>
    </div>
  );
};

export default FollowersContainer;
