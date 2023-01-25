import { FaStopwatch } from "react-icons/fa";

import styles from "./Modal.module.css";

function TreasureHuntGuideModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span>게임 가이드 </span>
        <br />방 안의 보물찾기
      </div>
      <button
        id={styles.modalCloseBtn}
        className={styles.treasureHuntGuide}
        onClick={closeModal}
      >
        ✖
      </button>
      <FaStopwatch />
      <ol className={styles.modaltxt}>
        <li>모든 참가자에게는 가져와야 할 물건이 제시됩니다.</li>
        <li>
          출제자는 2분 이내에 제시된 물건을 가져와 카메라에 인식시켜야 합니다.
        </li>
        <li>먼저 인식을 성공시킨 사람이 점수를 획득합니다.</li>
        <li>
          제한 시간 동안 조건을 달성한 사람이 없으면, 아무도 점수를 얻지 못하고
          다음 문제로 넘어갑니다.
        </li>
      </ol>
    </>
  );
}

export default TreasureHuntGuideModal;
