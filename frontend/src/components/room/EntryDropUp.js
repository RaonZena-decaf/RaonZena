import styles from "./EntryDropUp.module.css";
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { modifyMyFollowingList } from "../../app/myFollowingList";

function EntryDropUp({ show, setdrop, TotalUsers }) {
  const closeDrop = () => {
    setdrop(false);
  };

  const animation = [
    show === "entering" ? "Open" : show === "exiting" ? "Close" : null,
  ];

  const slide = [
    show === "entering" ? "SlideIn" : show === "exiting" ? "SlideOut" : null,
  ];

  let animationClass = animation.join(" ");
  let slideAnimationClass = slide.join(" ");
  //임시 유저 리스트. 현재 방 참가자 현황을 가져온 후, 팔로우 검증을 해서 boolean값을 적어줘야 한다.
  const [userList, setUserList] = useState([]);

  const dispatch = useDispatch();
  const baseUrl = useSelector((store) => store.baseUrl);
  const UserNo = useSelector((store) => store.userData.userNo);
  const location = useLocation();
  const roomNo = location.pathname.split("room/")[1];
  const MyFollowingList = useSelector((store) => store.myFollowingList);

  async function Follow(userNo) {
    await axios({
      method: "POST",
      url: `${baseUrl}profile`,
      data: { followNo: userNo },
      Headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        const newfollowing = MyFollowingList.slice()
        newfollowing.push(userNo)
        dispatch(modifyMyFollowingList(newfollowing))
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    axios({
      method: "Get",
      url: `${baseUrl}games/${roomNo}`,
    })
      .then((res) => {
        setUserList(res.data);
      })
      .catch((error) => console.log(error));
    //참가유저 리스트를 받아오는 axios 통신
  }, [TotalUsers]);

  return (
    <div
      onClick={closeDrop}
      className={`${styles.outside} ${styles[animationClass]}`}
    >
      <div
        className={`${styles.container} ${styles[slideAnimationClass]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {userList.map((user) => {
          return (
            <div key={user.user_name} className={styles.usercontainer}>
              {user.userName}
              {MyFollowingList.includes(user.userNo) ||
              user.userNo === UserNo ? null : (
                <span>
                  <FaUserPlus
                    className={styles.plusIcon}
                    onClick={() => {
                      Follow(user.userNo);
                    }}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EntryDropUp;
