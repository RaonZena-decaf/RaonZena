import { ProfileFollowingList } from "./ProfileFollowingList";
import styles from "./ProfileFollowingListDetail.module.css";

function ProfileFollowingListDetail() {
  return (
    <div className={styles.background}>
      <span className={styles.text}>팔로잉 목록</span>
      <div>
        {ProfileFollowingList.map((follower, userNo) => (
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

export default ProfileFollowingListDetail;
