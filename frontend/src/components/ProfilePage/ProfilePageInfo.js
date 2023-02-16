import styles from "./ProfilePageInfo.module.css";
import ProfileProgress from "./ProfileProgress.js";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { modifyMyFollowingList } from "../../app/myFollowingList";
import ModalPortal from "../Modal/Portal";
import SearchModalFrame from "../Modal/SearchModalFrame";
import { Transition } from "react-transition-group";
import Tooltip from "../navbar/ToolTip";

function ProfilePageInfo({
  handleOpen,
  setfollower,
  setfollowing,
  followerList,
  followingList,
  feedList,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = useSelector((store) => store.baseUrl);
  const loginUserNo = useSelector((store) => store.userData.userNo);
  const myFollowings = useSelector((store) => store.myFollowingList);
  const user_no = parseInt(location.pathname.split("profile/")[1]);
  const [followerCnt, setFollowerCnt] = useState(0);
  const [followingCnt, setFollowingCnt] = useState(0);
  const [followBtn, setFollowBtn] = useState();
  const [userInfo, setUserInfo] = useState({});
  const feedLength = feedList.length;

  //모달 표시를 위한 함수
  const [modalOn, setModalOn] = useState(false);
  const openModal = () => {
    setModalOn(true);
  };

  //모달을 닫는 함수
  const closeModal = () => {
    setModalOn(false);
  };

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
  }
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then()
      .catch((error) => console.log(error));
  };
  //팔로우버튼
  function toggleDone() {
    //팔로우 중이라면 팔로우 해제
    if (followBtn !== true) {
      axios({
        method: "POST",
        url: `${baseUrl}profile`,
        data: { followNo: user_no },
        Headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          const newfollowing = myFollowings.slice();
          newfollowing.push(user_no);
          dispatch(modifyMyFollowingList(newfollowing));
        })
        .catch((error) => console.log(error));
    } else {
      axios({
        method: "delete",
        url: `${baseUrl}profile/${user_no}`,
      })
        .then((res) => {
          const filtered = myFollowings.filter(
            (eliment) => eliment !== user_no
          );
          dispatch(modifyMyFollowingList(filtered));
        })
        .catch((error) => console.log(error));
    }
  }

  // 해당 페이지의 유저 프로필을 불러오는 axios 통신
  useLayoutEffect(() => {
    callUserInfo();
    if (myFollowings.includes(user_no)) {
      setFollowBtn(true);
    } else {
      setFollowBtn(false);
    }
  }, [location, myFollowings]);

  return (
    <div className={styles.background}>
      <div className={styles.background2}>
        <img
          alt="프로필"
          src={userInfo.userImage}
          className={styles.profileimg}
        />
        <Tooltip message={"클릭 시 복사"}>
        <p className={styles.profileid} onClick={() => copyToClipboard(userInfo.userId)} >친구코드 : {userInfo.userId}</p>
        </Tooltip>
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
          <Tooltip message={"유저 검색"}>
            <FaSearch className={styles.search} onClick={openModal} />
          </Tooltip>
        </div>
        <div className={styles.background4}>
          <span className={styles.profileid3}>Exp</span>
          <ProfileProgress exp={parseInt(userInfo.exp/2)} />
        </div>
        <div>
          <span className={styles.profileid5}>{`기록 ${feedLength}`}</span>
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
      <ModalPortal>
        <Transition unmountOnExit in={modalOn} timeout={500}>
          {(state) => <SearchModalFrame show={state} closeModal={closeModal} />}
        </Transition>
      </ModalPortal>
    </div>
  );
}

export default ProfilePageInfo;
