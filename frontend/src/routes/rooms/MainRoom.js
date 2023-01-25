import styles from "./MainRoom.module.css"
import React, {useState} from "react";
import MenuBar from "../../components/MenuBar"
import UserVid from "../../components/rooms/UserVid"

function MainRoom() {
  return (
    <div className={styles.background}>
      <UserVid/>
      <MenuBar/>
    </div>
  );
}

export default MainRoom;
