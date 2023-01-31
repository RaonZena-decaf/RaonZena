import { style } from "@mui/system";
import React, { useState, useNavigate } from "react";
import styles from "./GameRoom.module.css";

const Item = (props) => {
  return (
    <div className={styles.card}>
      <div>
        <img className={styles.imageSize} src={props.image_src} alt="" />
      </div>
      <div className={styles.RoomInfo}>
        <div className={styles.RoomTitle}>
          <p>{props.title}</p>
        </div>
        <div className={styles.UserCount}>
          <p>{props.users} / 6</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Item);

// return (
//   <div className={styles.BackGround}>
//     <img className={styles.RoomImage} alt="룸 이미지" src={props.src} />
//     <div className={styles.RoomTitle}>{props.title}</div>
//     <div className={styles.UserCount}> {props.users} / 6</div>
//   </div>
// );
