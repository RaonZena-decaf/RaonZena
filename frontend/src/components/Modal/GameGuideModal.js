import React from "react";
import { FaGamepad } from "react-icons/fa";

import styles from "./Modal.module.css";

function GameGuideModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span className={styles.highlight}>게임 진행</span> 가이드
      </div>
      <button
        id={styles.modalCloseBtn}
        className={styles.gameGuide}
        onClick={closeModal}
      >
        ✖
      </button>
      <FaGamepad />
      <ol className={styles.modaltxt}>
        <li>
          <span className={styles.boldHighlight}>방장</span>이 화면 하단의{" "}
          <span className={styles.boldHighlight}>게임 버튼</span>을 클릭 후,
          게임의 종류를 선택하면 게임이 시작됩니다.
        </li>
        <li>
          <span className={styles.boldHighlight}>게임마다 다른 규칙</span>이
          적용되므로, 게임 규칙을 미리 숙지하시길 바랍니다.
        </li>
        <li>
          참가자들은 게임을 플레이하는 것으로{" "}
          <span className={styles.boldHighlight}>점수</span>를 얻을 수 있습니다.
        </li>
        <li>
          게임이 종료되고 방에서 나가면 얻은 점수만큼 경험치를 얻을 수 있습니다.
        </li>
        <li>
          경험치를 모아 레벨이 오르면 새로운 사진용 프레임을 얻을 수 있습니다.
        </li>
      </ol>
    </>
  );
}

export default GameGuideModal;
