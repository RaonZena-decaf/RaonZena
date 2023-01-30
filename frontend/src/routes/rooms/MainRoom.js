import styles from "./MainRoom.module.css"
import React, {useState} from "react";
import MenuBar from "../../components/room/MenuBar"
import UserVid from "../../components/room/UserVid"
import ChattingBar from "../../components/room/ChattingBar"

function MainRoom() {
  //채팅바 토글을 위한 함수
  const [openChatting, setOpenChatting] = useState(false)
  const toggleBar  = () => setOpenChatting(!openChatting)
  

  //메인메뉴 모달을 위한 함수


  return (
    <div className={styles.background}>
      <UserVid/>
      <MenuBar toggleBar={toggleBar}/>
      <ChattingBar openChatting={openChatting} toggleBar={toggleBar}/>
    </div>
  );
}

export default MainRoom;
