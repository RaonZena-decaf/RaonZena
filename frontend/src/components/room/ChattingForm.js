import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./ChattingForm.module.css";

function ChattingForm({ messageList }) {
  const chattingLog = useRef();
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  function scrollToBottom() {
    setTimeout(() => {
      try {
        chattingLog.current.scrollTop = chattingLog.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  const userName = useSelector((store) => store.userData.userName);
  // console.log(publisher.videos[0].id)

  return (
    <div className={styles.container} ref={chattingLog}>
      <div className={styles.innercontainer}>
        {messageList.map(({ nickname, message }, idx) => {
          return (
            <>
              {userName === nickname ? (
                <div key={idx} className={styles.text}>
                  <div className={styles.chatbox2}>{message}</div>
                  <div className={styles.user2}>{nickname}</div>{" "}
                </div>
              ) : (
                <div key={idx} className={styles.text}>
                  <div className={styles.user}>{nickname}</div>{" "}
                  <div className={styles.chatbox}>{message}</div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default ChattingForm;
