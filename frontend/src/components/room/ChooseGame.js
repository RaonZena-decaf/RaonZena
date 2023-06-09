import { FaPalette } from "react-icons/fa";
import { FaHandPaper } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

import styles from "./ChooseGame.module.css";

function ChooseGame({ ChangeGame, host }) {
  // 유저가 방장인가? => 각 게임 아이콘 클릭 시 해당 게임 실행
  // 유저가 방장이 아닌가? => 게임은 방장이 시작할 수 있습니다! 안내창 출력


  return (
    <div className={styles.container}>
      {/* {host === true ? ( */}
        {/* <> */}
          <div className={styles.IconText} onClick={ChangeGame} id="imagetheme">
            <FaHandPaper className={styles.NoClick} />
            <div className={styles.gameName}>이미지 게임</div>
          </div>
          <div className={styles.IconText} onClick={ChangeGame} id="catchmind">
            <FaPalette className={styles.NoClick} />
            <div className={styles.gameName}>캐치 마인드</div>
          </div>
          <div
            className={styles.IconText}
            onClick={ChangeGame}
            id="talkingsilence"
          >
            <FaBell className={styles.NoClick} />
            <div className={styles.gameName}>고요 속의 외침</div>
          </div>
          <div className={styles.IconText} onClick={ChangeGame} id="personquiz">
            <FaUserCircle className={styles.NoClick} />
            <div className={styles.gameName}>인물 퀴즈</div>
          </div>
          <div className={styles.IconText} onClick={ChangeGame} id="joker">
            <FaFire className={styles.NoClick} />
            <div className={styles.gameName}>역전의 한 방!</div>
          </div>
        {/* </>
      ) : (
        <div className={styles.noGame}> 게임은 방장만 시작할 수 있어요!</div>
      )} */}
    </div>
  );
}

export default ChooseGame;
