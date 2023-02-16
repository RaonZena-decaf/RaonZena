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
        <li>
          본 기능은 <span className={styles.boldHighlight}>방장만</span> 사용
          가능합니다.
        </li>
        <li>
          화면 하단의{" "}
          <span className={styles.boldHighlight}>잡담 주제 버튼</span>을
          클릭하면, 랜덤한 주제가 제시됩니다.
        </li>
        <li>
          주제를 바꾸고 싶다면,{" "}
          <span className={styles.boldHighlight}>'다른 주제' 버튼</span>을 통해
          새로운 주제를 받을 수 있습니다.
        </li>
        <li>
          게임이 끝난 뒤 누르면 카메라 프레임이 원래대로 돌아옵니다.
        </li>
      </ol>
    </>
  );
}

export default ChattingGuideModal;
