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
          각 참가자는 화면에 자신의 손가락이 모두 인식되도록 카메라에 손을 펼쳐
          보입니다.
        </li>
        <li>자신 차례가 된 참가자는 키워드를 제시합니다.</li>
        <li>해당 키워드에 해당하는 참가자는 손가락을 하나 접습니다.</li>
        <li>
          차례를 진행한 참가자가 차례 넘기기 버튼을 눌러 다음 참가자에게 차례를
          넘깁니다.
        </li>
        <li>손가락이 모두 접힌 사람이 나올 때 까지 반복합니다.</li>
        <li>
          손이 모두 접힌 사람 이외의 모든 사람이 점수를 획득합니다. 누구를
          노릴지, 전략적으로 생각해 봅시다.
        </li>
      </ol>
    </>
  );
}

export default ImageGameGuideModal;
