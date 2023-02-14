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
        <li>모든 참가자에게 <span className={styles.boldHighlight}>8장의 카드</span>가 제시됩니다.</li>
        <li><span className={styles.boldHighlight}>점수가 낮은 참가자부터</span> 카드를 선택합니다.</li>
        <li>
          각 카드는 다양한 효과를 지니고 있습니다. 기울어진 판세를 뒤집을 강력한
          효과부터, 전혀 도움이 되지 않을 효과가 적혀 있을 수도 있습니다. <span className={styles.boldHighlight}>반전</span>이
          필요한 타이밍을 잘 골라 진행해 봅시다!
        </li>
        <li>
          각 참가자가 카드를 선택할 때마다 카드의 효과가 공개되며, 효과가
          적용됩니다.
        </li>
        <li>모든 참가자가 카드를 선택할 때 까지 반복합니다.</li>
      </ol>
    </>
  );
}

export default LotteryGuideModal;
