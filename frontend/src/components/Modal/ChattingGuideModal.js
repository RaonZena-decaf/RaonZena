import { useEffect } from "react";
import { FaMugHot } from "react-icons/fa";

import "./Modal.css";

function ChattingGuideModal({ closeModal }) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div className="chattingGuide" id="outside" onClick={closeModal}>
      <div className="modalcontainer" onClick={(e) => e.stopPropagation()}>
        <div className="modaltitle">
          {" "}
          <span>잡담 주제</span> 가이드{" "}
        </div>
        <button
          id="modalCloseBtn"
          className="chattingGuide"
          onClick={closeModal}
        >
          ✖
        </button>
        <FaMugHot />
        <ol className="modaltxt">
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
      </div>
    </div>
  );
}

export default ChattingGuideModal;
