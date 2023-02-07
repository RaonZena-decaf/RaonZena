import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Followings.module.css";
import { useSelector } from "react-redux";

const FollowingListItem = (props) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/profile/${props.userNo}`);
  };

  return (
    <div className={styles.FollowingsInfo} onClick={navigateToProfile}>
      <div className={styles.FollowingBox}>
        <img src={props.userImage} className={styles.ProfileImg} alt="프로필" />
      </div>
      <div className={styles.FollowingInfoFont}>
        <p>LV {props.level}</p>
      </div>
      <div className={styles.FollowingInfoFont}>
        <p>{props.userName}</p>
      </div>
      <div>
        {props.isOnline && (
          <img className={styles.OnlineSize} src="Online.svg" alt="Online" />
        )}
      </div>
    </div>
  );
};

export default React.memo(FollowingListItem);
