import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

import "./Modal.css";

function PersonQuizGuideModal({ closeModal }) {
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
    <div className="personQuizGuide" id="outside" onClick={closeModal}>
      <div className="modalcontainer" onClick={(e) => e.stopPropagation()}>
        <div className="modaltitle">
          {" "}
          <span>게임 가이드 </span>
          <br />
          인물 퀴즈
        </div>
        <button
          id="modalCloseBtn"
          className="personQuizGuide"
          onClick={closeModal}
        >
          ✖
        </button>
        <FaUserCircle />
        <ol className="modaltxt">
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
      </div>
    </div>
  );
}

export default PersonQuizGuideModal;
