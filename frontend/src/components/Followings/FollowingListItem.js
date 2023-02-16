import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FollowingList.module.css";
import { useSelector } from "react-redux";

const FollowingListItem = (props) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${props.userNo}`);
  };

  console.log("왜 프폽 온라인 안나옴?", props)

  return (
    <div className={styles.FollowingsInfo} onClick={navigateToProfile}>
      <img src={props.userImage} className={styles.ProfileImg} alt="프로필" />
      <div className={styles.FollowingInfoFont}>
        <p>LV {props.level}</p>
      </div>
      <div className={styles.FollowingInfoFont}>
        <p>{props.userName}</p>
      </div>
      <div className={styles.Online}>
        {props.online && (
          <img className={styles.OnlineSize} src="Online.png" alt="Online" />
        )}
      </div>
    </div>
  );
};

export default React.memo(FollowingListItem);
