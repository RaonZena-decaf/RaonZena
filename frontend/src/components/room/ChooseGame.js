import { FaPalette } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSketch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import styles from "./ChooseGame.module.css"

function ChooseGame() {
  // 유저가 방장인가? => 각 게임 아이콘 클릭 시 해당 게임 실행
  // 유저가 방장이 아닌가? => 게임은 방장이 시작할 수 있습니다! 안내창 출력 (2중모달은 좀 그러니까 alert)



  return(
    <div className={styles.container}>
      <div className={styles.IconText}>
        <FaHandPaper/>
        <div className={styles.gameName}>이미지 게임</div>
      </div>
      <div className={styles.IconText}>
        <FaSketch/>
        <div className={styles.gameName}>방 안의 보물찾기</div>
      </div>
      <div className={styles.IconText}>
        <FaPalette/>
        <div className={styles.gameName}>캐치 마인드</div>
      </div>
      <div className={styles.IconText}>
        <FaBell/>
        <div className={styles.gameName}>고요 속의 외침</div>
      </div>
      <div className={styles.IconText}>
        <FaUserCircle/>
        <div className={styles.gameName}>인물 퀴즈</div>
      </div>
      <div className={styles.IconText}>
        <FaFire/>
        <div className={styles.gameName}>역전의 한 방!</div>
      </div>
    </div>
  )
}

export default ChooseGame
