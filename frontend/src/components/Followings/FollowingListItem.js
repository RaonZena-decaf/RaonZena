import { style } from "@mui/system";
import React, { useState, useNavigate } from "react";
import styles from "./Followings.module.css";

const FollowingListItem = (props) => {
  return (
    <div className={styles.FollowingsInfo}>
      <div>
        <img
          className={styles.ProfileSize}
          src={props.userImage}
          alt="Profile"
        />
      </div>
      <div className={styles.FollowingInfoFontSize}>
        <p>LV {props.level}</p>
      </div>
      <div className={styles.FollowingInfoFontSize}>
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
