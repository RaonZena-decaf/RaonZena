import { useRef, useEffect, useState } from "react";
import styles from "./ChattingForm.module.css";

function ChattingForm(props) {
  const openvidu = props.openvidu
  const chattingLog = useRef();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  console.log(messageList, "error");
  useEffect(() => {
    if (openvidu.publisher) {
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
  }, [messageList]);

  function handleChange(event) {
    // console.log(chat.message)
    setMessage(event.target.value);
  }

  function chatsend(event) {
    event.preventDefault();
    if (message !== "") {
      sendMessage();
      setMessage("");
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
            <div key={idx}>
              {nickname} : {message}
            </div>
          )
        })}
      </div>
      <form>
        <input
          type={message}
          name={message}
          value={message || ""}
          onChange={handleChange}
        />
        <button type="submit" onClick={chatsend}>
          전송
        </button>
      </form>
    </div>
  );
}

export default ChattingForm;
