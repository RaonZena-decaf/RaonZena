import { style } from "@mui/system";
import React, { useState, useNavigate } from "react";
import styles from "./Followings.module.css";

export default function FollowingsInGameListItem(props) {
  // userName
  // userImage
  // level
  // roomTitle
  // headcount
  // password
  // currentCount

  return (
    <div className={styles.card}>
      <div className={styles.HostInfo}>
        <img
          className={styles.ProfileSize}
          src={props.userImage}
          alt="userImage"
        />
        <div className={styles.HostTextInfo}>
          <p className={styles.LevelFont}> LV {props.level}</p>
          <p className={styles.userNameFont}>{props.userName}</p>
        </div>
      </div>
      <div>
        <img
          className={styles.Roomimage}
          src={props.roomImage}
          alt="roomImage"
        />
      </div>
      <div className={styles.RoomInfo}>
        <div className={styles.roomTitle}>
          <p>{props.roomTitle}</p>
        </div>
        <div className={styles.UserCount}>
          <p>
            {props.currentCount} / {props.headcount}
          </p>
        </div>
      </div>

      <div className={styles.RoomInfo}></div>
    </div>
  );
}
