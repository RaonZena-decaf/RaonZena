import React from "react";
import { FaGamepad } from "react-icons/fa";

import styles from "./Modal.module.css";

function GameGuideModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span>게임 진행</span> 가이드
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
          방장이 화면 하단의 게임 버튼을 클릭 후, 게임의 종류를 선택하면 게임이
          시작됩니다.
        </li>
        <li>
          게임마다 다른 규칙이 적용되므로, 게임 규칙을 미리 숙지하시길 바랍니다.
        </li>
        <li>참가자들은 게임을 플레이하는 것으로 점수를 얻을 수 있습니다.</li>
        <li>
          방장은 임의로 게임을 중단할 수 있으며, 이 경우 점수는 유지됩니다.
        </li>
        <li>
          누군가 100점이 되면 게임이 종료됩니다. 이후 자동으로 기념사진 촬영이
          진행됩니다. 사진은 게임의 결과와 함께 저장됩니다.
        </li>
        <li>게임이 종료되면 점수가 초기화됩니다.</li>
      </ol>
    </>
  );
}

export default GameGuideModal;
