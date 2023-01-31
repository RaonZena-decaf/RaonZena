import styles from "./EntryDropUp.module.css";
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function EntryDropUp({ show, setdrop }) {
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

  useEffect(() => {
    //참가유저 리스트를 받아오는 axios 통신
  });

  //임시 유저 리스트. 현재 방 참가자 현황을 가져온 후, 팔로우 검증을 해서 boolean값을 적어줘야 한다.
  const userlist = [
    { user_name: "김찬빈", user_no:123, following: false },
    { user_name: "윤수희", user_no:126,following: false },
    { user_name: "홍영민", user_no:125,following: true },
    { user_name: "임길현", user_no:124,following: true },
    { user_name: "최지연", user_no:127,following: false },
  ];

  async function addFollowing(user_no) {
    // axios 통신을 통해 팔로우 추가
    await axios({
      method: "get",
      url: `http://localhost:8080/api/v1/profile/${user_no}`
    }).then((res) => {
      let followed = userlist.findIndex(function(data) {return data.user_no === user_no})
      userlist[followed].following = true
    })
  }

  return (
    <div
      onClick={closeDrop}
      className={`${styles.outside} ${styles[animationClass]}`}
    >
      <div
        className={`${styles.container} ${styles[slideAnimationClass]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {userlist.map((user) => {
          return (
            <div key={user.user_name} className={styles.usercontainer}>
              {user.user_name}
              {user.following === false && (
                <span>
                  <FaUserPlus className={styles.plusIcon} onClick={addFollowing(user.user_no)}/>
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
