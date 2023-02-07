import { style } from "@mui/system";
import React, { useState, useNavigate } from "react";
import styles from "./Followings.module.css";

const FollowingListItem = (props) => {
  return (
    <div className={styles.FollowingsInfo}>
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
