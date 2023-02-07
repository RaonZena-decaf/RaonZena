import { useRef, useEffect } from "react";
import styles from "./ChattingForm.module.css";

function ChattingForm({messageList}) {
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

  return (

    <div className={styles.container} ref={chattingLog}>
      <div className={styles.chattingbox}>
        {messageList.map(({nickname, message}, idx) => {
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
