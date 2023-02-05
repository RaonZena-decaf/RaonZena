import { useRef, useEffect, useState } from "react";
import styles from "./ChattingForm.module.css";

function ChattingForm(openvidu) {
  const chattingLog = useRef();
  const [messageList, setMessageList] = useState([]);
  console.log(messageList, "error");
  useEffect(() => {
    if (openvidu.openvidu.publisher) {
      openvidu.openvidu.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        setMessageList((prev) => [
          ...prev,
          {
            connectionId: event.from.connectionId,
            nickname: data.nickname,
            message: data.message,
          },
        ]);
        scrollToBottom();
      });
    }
  }, [messageList, openvidu]);

  function scrollToBottom() {
    setTimeout(() => {
      try {
        chattingLog.current.scrollTop = chattingLog.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  return (
    <div className={styles.container}>
      <div className={styles.chattingbox}>
        {messageList.map(({connectionId, nickname, message}, idx) => {
          return (
            <div key={idx}>
              {nickname} : {message}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ChattingForm;
