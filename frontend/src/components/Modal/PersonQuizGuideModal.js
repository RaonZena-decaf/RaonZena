import { FaUserCircle } from "react-icons/fa";

import styles from "./Modal.module.css";

function PersonQuizGuideModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span className={styles.highlight}>게임 가이드 </span>
        <br />
        인물 퀴즈
      </div>
      <button
        id={styles.modalCloseBtn}
        className={styles.personQuizGuide}
        onClick={closeModal}
      >
        ✖
      </button>
      <FaUserCircle />
      <ol className={styles.modaltxt}>
        <li>모든 참가자들에게 유명 인물의 사진이 30초간 제시됩니다.</li>
        <li>
          참가자들은 해당 사진이 누구의 것인지 정답란에 이름을 입력합니다.
        </li>
        <li>먼저 답을 제출한 사람이 점수를 획득합니다.</li>
        <li>
          제한 시간 동안 답을 맞추는 사람이 없으면, 아무도 점수를 얻지 못하고
          다음 문제로 넘어갑니다.
        </li>
      </ol>
    </>
  );
}

export default PersonQuizGuideModal;
