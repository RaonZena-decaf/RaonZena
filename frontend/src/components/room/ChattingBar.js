import React, { useState } from "react";
import styles from "./ChattingBar.module.css";
import ChattingForm from "./ChattingForm"

function ChattingBar({ openChatting, toggleBar }) {
  const [closeBar, setCloseBar] = useState(false);
  const closing = () => {
    setCloseBar(true)
    setTimeout(function(){
      setCloseBar(false)
    },1000)
    
  }

  return (
    <div
      className={
        openChatting || closeBar
          ? openChatting
            ? `${styles.sidebar} ${styles.active}`
            : `${styles.sidebar} ${styles.inactive}`
          : `${styles.sidebar}`
      }
    >
      <ChattingForm/>
      <div
        className={styles.exitbutton}
        onClick={() => {
          closing()
          toggleBar()
          }}>
            X
        </div>
    </div>
  );
}

export default React.memo(ChattingBar);
