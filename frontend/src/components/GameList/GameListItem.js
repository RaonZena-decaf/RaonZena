import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameList.module.css";

const Item = (props) => {
  const navigate = useNavigate();

  const navigateToGameRoom = () => {
    navigate(`/beforeroom/${props.roomNo}`);
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.imageSize}
        src={props.image_src}
        alt=""
        onClick={navigateToGameRoom}
      />
      <p className={styles.RoomTitle} onClick={navigateToGameRoom}>
        {props.title}
      </p>
      <p className={styles.UserCount}>
        {props.users} / {props.headcount}
      </p>
    </div>
  );
};

export default React.memo(Item);
