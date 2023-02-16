import { style } from "@mui/system";
import React, { useState, useEffect } from "react";
import styles from "./HostFollowingGames.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function FollowingsInGameListItem(props) {

  const navigate = useNavigate();
  const [users, setUsers] = useState(0);
  const baseUrl = useSelector((store) => store.baseUrl);

  const navigateToGameRoom = () => {
    navigate(`/beforeroom/${props.roomNo}`, {
      state: {
        roomNo: props.roomNo,
        headcount: props.headcount,
        roomTitle: props.roomTitle,
        users: users,
        password: props.password,
      },
    });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}games/${props.roomNo}/join`,
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.HostInfo}>
        <img
          className={styles.HostImage}
          src={props.host.userImageUrl}
          alt="userImage"
        />
        <div className={styles.HostTextInfo}>
          <span className={styles.LevelFont}>
            {" "}
            LV {props.host.level} <br></br>
            <span className={styles.userNameFont}>{props.host.userName}</span>
          </span>
        </div>
        <div></div>
      </div>
      <div>
        <img
          className={styles.Roomimage}
          src={props.imageName}
          alt="roomImage"
          onClick={navigateToGameRoom}
        />
      </div>
      <div className={styles.RoomInfo}>
        <div className={styles.RoomTitle} onClick={navigateToGameRoom}>
          <p>{props.roomTitle}</p>
        </div>
        <div className={styles.UserCount}>
          <p onClick={navigateToGameRoom}>
            {users} / {props.headcount}
          </p>
        </div>
      </div>
    </div>
  );
}
