import { FaMugHot } from "react-icons/fa";

import styles from "./Modal.module.css";

function ChattingGuideModal({ closeModal }) {
  return (
    <>
      <div className={styles.modaltitle}>
        <span className={styles.highlight}>잡담 주제</span> 가이드
      </div>
      <button
        id={styles.modalCloseBtn}
        className={styles.chattingGuide}
        onClick={closeModal}
      >
        ✖
      </button>
      <FaMugHot />
      <ol className={styles.modaltxt}>
        <li>본 기능은 방장만 사용 가능합니다.</li>
        <li>
          화면 하단의 잡담 주제 버튼을 클릭하면, 모든 참가자의 창에 랜덤한
          주제가 제시됩니다.
        </li>
        <li>
          주제를 바꾸고 싶다면, '다른 주제' 버튼을 통해 새로운 주제를 받을 수
          있습니다.
        </li>
      </ol>
    </>
  );
}

export default ChattingGuideModal;
