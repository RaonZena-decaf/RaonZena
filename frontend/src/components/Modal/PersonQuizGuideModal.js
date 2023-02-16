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
        <li>
          모든 참가자들에게 유명{" "}
          <span className={styles.boldHighlight}>인물의 사진</span>이 3초간
          제시됩니다.
        </li>
        <li>
          참가자들은 해당 사진이 누구의 것인지{" "}
          <span className={styles.boldHighlight}>정답란에 이름</span>을
          입력합니다.
        </li>
        <li>
          <span className={styles.boldHighlight}>답을 제출</span>한 사람이{" "}
          <span className={styles.boldHighlight}>점수</span>를 획득합니다.
        </li>
        <li>
          제한 시간 동안 답을 맞추는 사람이 없으면, 아무도 점수를 얻지 못하고
          다음 문제로 넘어갑니다.
        </li>
      </ol>
    </>
  );
}

export default PersonQuizGuideModal;
