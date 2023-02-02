import { useNavigate } from "react-router-dom";
import styles from "./ExitRoom.module.css"



function ExitRoom ({closeMenu, exitaction}) {
  //방에서 나간 후 라이브 페이지로 돌아가는 함수
  const navigate = useNavigate();
  const exitRoom = () => {
    //이곳에 방에서 나가는 요청을 보내는 함수를 넣는다.
    exitaction()
    navigate("/live");
  };

  return (
    <div className={styles.background}>
      <p className={styles.title}>방에서 나가시겠어요?</p>
      <div className={styles.buttons}>
        <div onClick={exitRoom} className={styles.yes}>네</div>
        <div onClick={closeMenu} className={styles.no}>아니오</div>
      </div>
    </div>
  )
}

export default ExitRoom