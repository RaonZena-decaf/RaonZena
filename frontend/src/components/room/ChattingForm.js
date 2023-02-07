import { useRef, useEffect, useState } from "react";
import styles from "./ChattingForm.module.css";

function ChattingForm(props) {
  const openvidu = props.openvidu
  const chattingLog = useRef();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (openvidu.session) {
      openvidu.session.on("signal:chat", (event) => {
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
  }, []);

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function chatsend(event) {
    event.preventDefault();
    if (message !== "") {
      sendMessage();
    }
  }

  function sendMessage() {
    if (message) {
      const data = {
        message: message,
        nickname: openvidu.userName,
      };
      openvidu.session.signal({
        data: JSON.stringify(data),
        type: "chat",
      });
    }
    setMessage("");
  }

  function scrollToBottom() {
    setTimeout(() => {
      try {
        chattingLog.current.scrollTop = chattingLog.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  return (
    <div className={styles.container}>
      <div className={styles.chattingbox} ref={chattingLog}>
        {messageList.map(({connectionId, nickname, message}, idx) => {
          return (
            <div key={idx} className={styles.text}>
              {nickname} : {message}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default ChattingForm;
