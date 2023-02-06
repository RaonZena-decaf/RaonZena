import React, { useState } from "react";
import styles from "./ChattingBar.module.css";
import ChattingForm from "./ChattingForm";

function ChattingBar({ openChatting, toggleBar, openvidu }) {
  const [closeBar, setCloseBar] = useState(false);
  const closing = () => {
    setCloseBar(true);
    setTimeout(function () {
      setCloseBar(false);
    }, 1000);
  };

  //채팅용 함수들
  const [message, setMessage] = useState("");

  function handleChange(event) {
    // console.log(chat.message)
    setMessage(event.target.value);
  }

  function sendMessage() {
    if (message) {
      const data = {
        message: message,
        nickname: openvidu.userName,
      };
      openvidu.openvidu.session.signal({
        data: JSON.stringify(data),
        type: "chat",
      });
    }
    setMessage("");
  }

  function chatsend(event) {
    event.preventDefault();
    if (message !== "") {
      sendMessage();
      setMessage("");
    }
  }

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      if (message !== "") {
        sendMessage();
        setMessage("");
      }
    }
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
      <ChattingForm openvidu={openvidu} />
      <form className={styles.form}>
        <input
          type={message}
          name={message}
          value={message || ""}
          onChange={handleChange}
          className={styles.input}
          onKeyDown={(e)=>activeEnter(e)}
        />
        <button type="submit" onClick={chatsend} className={styles.button}>
          전송
        </button>
      </form>
      {openChatting && 
      <div
        className={styles.exitbutton}
        onClick={() => {
          closing();
          toggleBar();
        }}
      >
        X
      </div>}
    </div>
  );
}

export default React.memo(ChattingBar);
