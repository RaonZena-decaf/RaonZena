import styles from "./ProfileFollowingListDetail.module.css";
import { useNavigate } from "react-router-dom";
import NoFollow from "./NoFollow";

function ProfileFollowingListDetail({ handleClose, following }) {
  const navigate = useNavigate();
  const moveToProfile = (userNo) => {
    handleClose();
    console.log(userNo);
    navigate(`/profile/${userNo}`);
  };

  return (
    <div className={styles.background}>
      <span className={styles.text}>팔로잉 목록</span>
      {following.length === 0 ? (
        <NoFollow/>
      ) : (
        <div>
          {following.map((follower, userNo) => (
            <div
              key={userNo}
              className={styles.background2}
              onClick={() => moveToProfile(follower.userNo)}
            >
              <img
                className={styles.img}
                alt="img"
                src={follower.userImageUrl}
              />
              <span>{`Lv ${follower.level}`}</span>
              <span>{follower.userName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileFollowingListDetail;
