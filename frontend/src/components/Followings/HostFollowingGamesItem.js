import { style } from "@mui/system";
import React, { useState, useNavigate } from "react";
import styles from "./HostFollowingGames.module.css";

export default function FollowingsInGameListItem(props) {
  return (
    <div className={styles.card}>
      <div className={styles.HostInfo}>
        <img
          className={styles.HostImage}
          src={props.userImage}
          alt="userImage"
        />
        <div className={styles.HostTextInfo}>
          <p className={styles.LevelFont}>
            {" "}
            LV {props.level} <br></br>
            <p className={styles.userNameFont}>{props.userName}</p>
          </p>
        </div>
        <div></div>
      </div>
      <div>
        <img
          className={styles.Roomimage}
          src={props.roomImage}
          alt="roomImage"
        />
      </div>
      <div className={styles.RoomInfo}>
        <div className={styles.RoomTitle}>
          <p>{props.roomTitle}</p>
        </div>
        <div className={styles.UserCount}>
          <p>
            {props.currentCount} / {props.headcount}
          </p>
        </div>
      </div>
    </div>
  );
}
