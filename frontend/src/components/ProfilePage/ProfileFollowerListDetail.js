import { ProfileFollowerList } from "./ProfileFollowerList";
import styles from "./ProfileFollowerListDetail.module.css";

function ProfileFollowerListDetail() {
  return (
    <div className={styles.background}>
      <span className={styles.text}>팔로워 목록</span>
      <div>
        {ProfileFollowerList.map((follower, userNo) => (
          <div key={userNo} className={styles.background2}>
            <img className={styles.img} alt="img" src={follower.userImageUrl} />
            <span>{`Lv ${follower.level}`}</span>
            <span>{follower.userName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileFollowerListDetail;
