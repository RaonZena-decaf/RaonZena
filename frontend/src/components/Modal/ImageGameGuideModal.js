import { FaHandPaper } from "react-icons/fa";

import styles from "./Modal.module.css";

function ImageGameGuideModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span className={styles.highlight}>게임 가이드 </span>
        <br />
        이미지 게임
      </div>
      <button
        id={styles.modalCloseBtn}
        className={styles.imageGameGuide}
        onClick={closeModal}
      >
        ✖
      </button>
      <FaHandPaper />
      <ol className={styles.modaltxt}>
        <li>
          각 참가자는 화면에 자신의 손가락이 모두 인식되도록{" "}
          <span className={styles.boldHighlight}>카메라에 손</span>을 펼쳐
          보입니다.
        </li>
        <li>
          순서대로 돌아가면서{" "}
          <span className={styles.boldHighlight}>키워드</span>를 제시합니다.
        </li>
        <li>
          해당 키워드에{" "}
          <span className={styles.boldHighlight}>해당하는 참가자</span>는{" "}
          <span className={styles.boldHighlight}>손가락을 하나</span> 접습니다.
        </li>
        <li>손가락이 모두 접힌 사람이 나올 때 까지 반복합니다.</li>
        <li>
          손이{" "}
          <span className={styles.boldHighlight}>
            모두 접힌 사람은 점수가 차감됩니다.
          </span>
          누구를 노릴지, 전략적으로 생각해 봅시다.
        </li>
      </ol>
    </>
  );
}

export default ImageGameGuideModal;
