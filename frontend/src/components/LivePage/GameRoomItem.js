import RoomTitleForm from "./RoomTitleForm";
import RoomTitleCard from "./RoomTitleCard";
import React, { useState, useNavigate } from "react";
import styles from "./GameRoom.module.css";

const GameRoomItem = (props) => {
  return (
    // <div>{props.title}</div>
    <div>
      <div></div>
      <div className={styles.FloatLeft}>{props.title}</div>
      <div className={styles.FloatRight}> {props.users}</div>
    </div>
  );
};

export default React.memo(GameRoomItem);
