import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './ChattingForm.module.css'

function ChattingForm(openvidu) {
  const chattingLog = useRef()
  const [chat, setChat] = useState({
    messageList: [],
    message: '',
  })

  console.log('openvidu', openvidu)
  const { messageList, message } = chat

  useEffect(() => {
    if (openvidu.publisher !== "") {
      openvidu.session.on('signal:chat', event => {
        const data = JSON.parse(event.data)
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        })
        setChat(prev => ({ ...prev, messageList }))
        scrollToBottom()
      })
    }
  }, [messageList])

  function handleChange(event) {
    // console.log(chat.message)
    setChat(prev => ({
      ...prev,
      message: event.target.value,
    }))
  }

  function chatsend(event) {
    event.preventDefault();
    if (message !== "") {
      sendMessage()
      setChat("") }
  }

  function sendMessage() {
    if (chat.message) {
      const data = {
        message: chat.message,
        nickname: openvidu.userName,
      }
      openvidu.publisher.session.signal({
        data: JSON.stringify(data),
        type: 'chat',
      })
    }
    setChat(prev => ({
      ...prev,
      message: '',
    }))
  }

  function scrollToBottom() {
    setTimeout(() => {
      try {
        chattingLog.current.scrollTop = chattingLog.current.scrollHeight
      } catch (err) {}
    }, 20)
  } 

  return (
    <div className={styles.container}>
      채팅 내용들을 표시하는 곳
      <form>
        <input type={message} name={message} value={message} onChange={handleChange} />
        <button type="submit" onClick={chatsend}>
          전송
        </button>
      </form>
    </div>
  );
}

export default ChattingForm;
