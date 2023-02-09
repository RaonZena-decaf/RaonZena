import styles from "./ProfilePageInfo.module.css";
import ProfileProgress from "./ProfileProgress.js";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { modifyMyFollowingList } from "../../app/myFollowingList";
import { store } from "../../app/store";
import { useEffect } from "react";

function ProfilePageInfo({
  handleOpen,
  setfollower,
  setfollowing,
  followerList,
  followingList,
  feedList,
}) {
  const dispatch = useDispatch();
  const baseUrl = useSelector((store) => store.baseUrl);
  const loginUserNo = useSelector((store) => store.userData.userNo);
  const [followerCnt, setFollowerCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);
  const [followBtn, setFollowBtn] = useState(false);
  const navigate = useNavigate();
  const feedLength = feedList.length;
  const myFollowings = useSelector((store) => store.myFollowingList);
  const [userInfo, setUserInfo] = useState({});
  const location = useLocation();
  const user_no = parseInt(location.pathname.split("profile/")[1]);

  async function callUserInfo() {
    axios({
      method: "get",
      url: `${baseUrl}profile/${user_no}`,
    })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((error) => navigate("/error"));
    //팔로워, 팔로잉 수
    axios({
      method: "get",
      url: `${baseUrl}profile/${user_no}/followerCnt`,
    })
      .then((res) => {
        setFollowerCnt(res.data);
      })
      .catch((error) => console.log(error));

    axios({
      method: "get",
      url: `${baseUrl}profile/${user_no}/followingCnt`,
    })
      .then((res) => {
        setFollowingCnt(res.data);
      })
      .catch((error) => console.log(error));
    // 로그인 유저의 팔로잉 리스트
    await axios({
      method: "get",
      url: `${baseUrl}profile/${loginUserNo}/following`,
    }).then((res) => {
      const array = [];
      const followlist = res.data;
      followlist.forEach((following) => {
        array.push(following.userNo);
      });
      dispatch(modifyMyFollowingList(array));
    });
  }

  //팔로우버튼
  function toggleDone() {
    //팔로우 중이라면 팔로우 해제
    if (followBtn !== true) {
      console.log(followBtn);
      axios({
        method: "post",
        url: `${baseUrl}profile`,
        data: { followNo: user_no },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else {
      console.log(followBtn);
      axios({
        method: "delete",
        url: `${baseUrl}profile`,
        data: user_no,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    }
    //팔로우 중이 아니라면 팔로우
    setFollowBtn(!followBtn);
  }

  // 해당 페이지의 유저 프로필을 불러오는 axios 통신
  useLayoutEffect(() => {
    callUserInfo();
    if (myFollowings.includes(user_no)) {
      setFollowBtn(true);
    } else {
      setFollowBtn(false);
    }
  }, [location, followBtn]);

  return (
    <div className={styles.background}>
      <div className={styles.background2}>
        <img
          alt="프로필"
          src={userInfo.userImage}
          className={styles.profileimg}
        />
        <p className={styles.profileid}>코드 : {userInfo.userId}</p>
      </div>
      <div className={styles.background3}>
        <div className={styles.background5}>
          <span className={styles.profileid2}>
            {`LV ${userInfo.level} ${userInfo.userName}`}
          </span>
          {loginUserNo === userInfo.userNo
            ? null
            : loginUserNo && (
                <button
                  onClick={() => toggleDone()}
                  className={` ${followBtn ? styles.follow : styles.follow2}`}
                >
                  {followBtn ? "팔로우 중" : "팔로우"}
                </button>
              )}
          <FaSearch className={styles.search} />
        </div>
        <div className={styles.background4}>
          <span className={styles.profileid3}>Exp</span>
          <ProfileProgress exp={userInfo.exp} />
        </div>
        <div>
          <span className={styles.profileid4}>{`기록 ${feedLength}`}</span>
          <span
            onClick={() => {
              handleOpen();
              setfollowing(followingList);
            }}
            className={`${styles.profileid4} ${styles.photocard}`}
          >{`팔로잉 ${followingCnt}`}</span>
          <span
            onClick={() => {
              handleOpen();
              setfollower(followerList);
            }}
            className={`${styles.profileid4} ${styles.photocard}`}
          >{`팔로워 ${followerCnt}`}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePageInfo;
