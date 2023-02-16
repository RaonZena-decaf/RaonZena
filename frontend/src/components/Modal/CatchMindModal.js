import { FaPalette } from "react-icons/fa";

import styles from "./Modal.module.css";

function CatchMindModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span className={styles.highlight}>게임 가이드 </span>
        <br />
        캐치마인드
      </div>
      <button
        id={styles.modalCloseBtn}
        className={styles.catchMindGuide}
        onClick={closeModal}
      >
        ✖
      </button>
      <FaPalette />
      <ol className={styles.modaltxt}>
        <li>방장에게 <span className={styles.boldHighlight}>키워드</span>가 주어집니다.</li>
        <li>방장은 <span className={styles.boldHighlight}>1분</span> 동안 제시어에 대한 <span className={styles.boldHighlight}>그림</span>을 그립니다.</li>
        <li>
          방장이 그림을 그리는 동안, 나머지 사람들은 제시어를 추리합니다.
        </li>
        <li>
          정답란에 가장 <span className={styles.boldHighlight}>먼저 답</span>을 제출한 <span className={styles.boldHighlight}>사람</span>이 점수를 획득합니다.
          출제자도 다른 사람들이 맞추기 쉽도록 열심히 그려 봅시다!
        </li>
        <li>
          제한 시간 동안 답을 맞춘 사람이 없으면, 아무도 점수를 얻지 못하고 다음
          문제로 넘어갑니다.
        </li>
        <li>
          5문제가 출제되고 난 후, 게임이 종료됩니다.
        </li>
      </ol>
    </>
  );
}

export default CatchMindModal;
