import { useState } from "react"
import styles from "./ChattingForm.module.css"

function ChattingForm () {
  const [chat,setChat] = useState("")
  const handeChange = ({target : {value} }) => setChat(value)
  // 소켓통신을 통한 채팅 구현
  return (
    <div className={styles.container}>
      채팅 내용들을 표시하는 곳
      <form>
        <input
          type={chat}
          name={chat}
          value={chat}
          onChange={handeChange}/>
        <button type="submit">전송</button>
      </form>
    </div>
  )
}

export default ChattingForm