import { style } from "@mui/system";
import React, { useState } from "react";
import styles from "./HostFollowingGames.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FollowingsInGameListItem(props) {

  const navigate = useNavigate();
  const [users, setUsers] = useState(0);
  const baseUrl = useSelector((store) => store.baseUrl);

  const navigateToGameRoom = () => {
    navigate(`/beforeroom/${props.roomNo}`, {
      state: {
        roomNo: props.roomNo,
        headcount: props.headcount,
        roomTitle: props.title,
        users: users,
        password: props.password
      },
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.HostInfo}>
        <img
          className={styles.HostImage}
          src={props.userImage}
          alt="userImage"
        />
        <div className={styles.HostTextInfo}>
          <span className={styles.LevelFont}>
            {" "}
            LV {props.level} <br></br>
            <span className={styles.userNameFont}>{props.userName}</span>
          </span>
        </div>
        <div></div>
      </div>
      <div>
        <img
          className={styles.Roomimage}
          src={props.roomImage}
          alt="roomImage"
          onClick={navigateToGameRoom}
        />
      </div>
      <div className={styles.RoomInfo}>
        <div className={styles.RoomTitle} onClick={navigateToGameRoom}>
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
