import styles from "./ProfilePageInfo.module.css";
import ProfileProgress from "./ProfileProgress";
import { ProfileUserInfo } from "./ProfileUserInfo";
import { photoList } from "./ProfilePost";
import { ProfileFollowerList } from "./ProfileFollowerList";
import { ProfileFollowingList } from "./ProfileFollowingList";
import { useState } from "react";

function ProfilePageInfo({ handleOpen, setfollower, setfollowing }) {
  const [follow, setFollow] = useState(false);
  function toggleDone() {
    setFollow((prev) => !prev);
  }

  return (
    <div className={styles.background}>
      <div className={styles.background2}>
        <img
          alt="프로필"
          src={ProfileUserInfo.userImage}
          className={styles.profileimg}
        />
        <p className={styles.profileid}>친구코드 : {ProfileUserInfo.userId}</p>
      </div>
      <div className={styles.background2}>
        <span className={styles.profileid2}>
          {`LV ${ProfileUserInfo.level} ${ProfileUserInfo.userName} 님의 프로필`}
        </span>
        <div className={styles.background4}>
          <span className={styles.profileid3}>Exp</span>
          <ProfileProgress />
        </div>
        <div>
          <span
            className={styles.profileid4}
          >{`기록 ${photoList.length}`}</span>
          <span
            onClick={() => {
              handleOpen();
              setfollowing(ProfileFollowingList);
            }}
            className={`${styles.profileid4} ${styles.photocard}`}
          >{`팔로잉 ${ProfileFollowingList.length}`}</span>
          <span
            onClick={() => {
              handleOpen();
              setfollower(ProfileFollowerList);
            }}
            className={`${styles.profileid4} ${styles.photocard}`}
          >{`팔로워 ${ProfileFollowerList.length}`}</span>
        </div>
        {/* <p
          className={styles.profileid4}
        >{`기록 ${photoList.length} 팔로잉 ${ProfileFollowingList.length} 팔로워 ${ProfileFollowerList.length}`}</p> */}
        {/* <p className={styles.profileid4}>기록 8 팔로잉 13 팔로우 9</p> */}
      </div>
      <div className={styles.background6}>
        <button
          onClick={toggleDone}
          className={`${styles.follow} ${styles.photocard} ${
            follow ? styles.follow : styles.follow2
          }`}
        >
          {follow ? "팔로우 중" : "팔로우 하기"}
        </button>
        {/* <button className={styles.follow}>팔로우 중</button>
        <button className={styles.follow2}>팔로우 하기</button> */}
      </div>
      <div className={styles.background2}>
        <button type="button" className={styles.search}>
          <img alt="search" src="/profile/profilesearch.png" />
        </button>
      </div>
    </div>
  );
}

export default ProfilePageInfo;
