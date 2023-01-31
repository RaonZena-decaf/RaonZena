import styles from "./ProfilePageInfo.module.css";
import ProfileProgress from "./ProfileProgress";

function ProfilePageInfo() {
  return (
    <div className={styles.background}>
      <div className={styles.background2}>
        <img
          alt="프로필"
          src="/profile/profileimg.png"
          className={styles.profileimg}
        />
        <p className={styles.profileid}>친구코드:1110000011</p>
      </div>
      <div className={styles.background2}>
        <p className={styles.profileid2}>Lv 38 혼자놀기싫어요 님의 프로필</p>
        <div className={styles.background4}>
          <p className={styles.profileid3}>Exp</p>
          <ProfileProgress />
        </div>
        <p className={styles.profileid4}>기록 8 팔로잉 13 팔로우 9</p>
      </div>
      <div className={styles.background2}>
        <button className={styles.follow}>팔로우 중</button>
        <button className={styles.follow2}>팔로우 하기</button>
      </div>
      <div className={styles.background2}>
        <button type="button" className={styles.search}>
          <img
            // alt="프로필"
            src="/profile/profilesearch.png"
            // className={styles.profileimg}
          />
        </button>
      </div>
    </div>
  );
}

export default ProfilePageInfo;
