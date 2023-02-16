import { FaFire } from "react-icons/fa";

import styles from "./Modal.module.css";

function LotteryGuideModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span className={styles.highlight}>게임 가이드 </span>
        <br />
        역전의 한 방!
      </div>
      <button
        id={styles.modalCloseBtn}
        className={styles.lotteryGuide}
        onClick={closeModal}
      >
        ✖
      </button>
      <FaFire />
      <ol className={styles.modaltxt}>
        <li>
          모든 참가자에게
          <span className={styles.boldHighlight}>8장의 카드</span>가 제시됩니다.
        </li>
        <li>
          <span className={styles.boldHighlight}>각자 한 장씩</span> 카드를
          선택합니다.
        </li>
        <li>카드의 효과로 점수를 얻거나 잃을 수 있습니다.</li>
      </ol>
    </>
  );
}

export default LotteryGuideModal;
