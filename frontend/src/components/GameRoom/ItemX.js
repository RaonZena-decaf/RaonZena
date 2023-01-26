import React, { useState, useNavigate } from "react";
import styles from "./GameRoom.module.css";

const ItemX = (props) => {
  return (
    <div className={styles.BackGround}>
      <img className={styles.RoomImage} alt="룸 이미지" src={props.src} />
      <div className={styles.RoomTitle}>{props.title}</div>
      <div className={styles.UserCount}> {props.users} / 6</div>
    </div>
  );
};

export default React.memo(ItemX);
