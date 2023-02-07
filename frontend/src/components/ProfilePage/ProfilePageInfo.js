import styles from "./ProfilePageInfo.module.css";
import ProfileProgress from "./ProfileProgress.js";
import { photoList } from "./ProfilePost";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePageInfo({ handleOpen,setfollower,setfollowing,followerList,followingList }) {
  const baseUrl = useSelector((store) => store.baseUrl);
  const loginUserNo = useSelector((store) => store.userData.userNo);
  const [followerCnt, setFollowerCnt] = useState(0)
  const [followingCnt, setFollowingCnt] = useState(0)
  const [followBtn, setFollowBtn] = useState(false);
  const navigate = useNavigate()

  function toggleDone() {
    setFollowBtn((prev) => !prev);
  }
  const [userInfo, setUserInfo] = useState({});
  const location = useLocation();

  async function callUserInfo() {
    const user_no = location.pathname.split("profile/")[1];
    axios({
      method: "get",
      url: `${baseUrl}profile/${user_no}`,
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => navigate('/error'));
    //팔로워, 팔로잉 수
    axios({
        method:"get",
        url: `${baseUrl}profile/${user_no}/followerCnt`,
      })
      .then((res)=>{
        setFollowerCnt(res.data)
      })
      .catch((error) => console.log(error));

    axios({
        method:"get",
        url: `${baseUrl}profile/${user_no}/followingCnt`,
      })
      .then((res)=>{
        setFollowingCnt(res.data)
      })
      .catch((error) => console.log(error));
  } 

  // 해당 페이지의 유저 프로필을 불러오는 axios 통신
  useLayoutEffect(() => {
    callUserInfo();
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.background2}>
        <img
          alt="프로필"
          src={userInfo.userImage}
          className={styles.profileimg}
        />
        <p className={styles.profileid}>친구코드 : {userInfo.userId}</p>
      </div>
      <div className={styles.background3}>
        <span className={styles.profileid2}>
          {`LV ${userInfo.level} ${userInfo.userName}`}
        </span>
        <div className={styles.background4}>
          <span className={styles.profileid3}>Exp</span>
          <ProfileProgress exp={userInfo.exp} />
        </div>
        <div>
          <span
            className={styles.profileid4}
          >{`기록 ${photoList.length}`}</span>
          <span
            onClick={() => {
              handleOpen();
              setfollowing(followingList)
            }}
            className={`${styles.profileid4} ${styles.photocard}`}
          >{`팔로잉 ${followingCnt}`}</span>
          <span
            onClick={() => {
              handleOpen();
              setfollower(followerList)
            }}
            className={`${styles.profileid4} ${styles.photocard}`}
          >{`팔로워 ${followerCnt}`}</span>
        </div>
      </div>
      <div className={styles.background6}>
        {loginUserNo === userInfo.userNo ? null : (
          <button
            onClick={toggleDone}
            className={`${styles.follow} ${styles.photocard} ${
              followBtn ? styles.follow : styles.follow2
            }`}
          >
            {followBtn ? "팔로우 중" : "팔로우"}
          </button>
        )}
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
