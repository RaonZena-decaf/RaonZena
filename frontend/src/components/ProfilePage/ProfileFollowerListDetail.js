import styles from "./ProfileFollowerListDetail.module.css";
import { useNavigate } from "react-router-dom";

function ProfileFollowerListDetail({handleClose, follower}) {
  const navigate = useNavigate()
  const moveToProfile = (userNo) => {
    handleClose()
    navigate(`/profile/${userNo}`)
  }


  return (
    <div className={styles.background}>
      <span className={styles.text}>팔로워 목록</span>
      <div>
        {follower.map((follower, userNo) => (
          <div key={userNo} className={styles.background2} onClick={() => moveToProfile(follower.userNo)}>
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
