import { style } from "@mui/system";
import React, { useState, useNavigate } from "react";
import styles from "./GameList.module.css";

const Item = (props) => {
  return (
    <div className={styles.card}>
      <div>
        <img className={styles.imageSize} src={props.image_src} alt="" />
      </div>
      <div>
        <p className={styles.RoomTitle}>{props.title}</p>
        <p className={styles.UserCount}>
          {props.users} / {props.headcount}
        </p>
      </div>

      {/* <div className={styles.UserCount}>
      </div> */}
      {/* <div className={styles.RoomInfo}></div> */}
    </div>
  );
};

export default React.memo(Item);
