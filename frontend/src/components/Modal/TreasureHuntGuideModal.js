import { useEffect } from "react";
import { FaStopwatch } from "react-icons/fa";

import "./Modal.css";

function TreasureHuntGuideModal({ closeModal }) {
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
    <div className="treasureHuntGuide" id="outside" onClick={closeModal}>
      <div className="modalcontainer" onClick={(e) => e.stopPropagation()}>
        <div className="modaltitle">
          {" "}
          <span>게임 가이드 </span>
          <br />방 안의 보물찾기
        </div>
        <button
          id="modalCloseBtn"
          className="treasureHuntGuide"
          onClick={closeModal}
        >
          ✖
        </button>
        <FaStopwatch />
        <ol className="modaltxt">
          <li>모든 참가자에게는 가져와야 할 물건이 제시됩니다.</li>
          <li>
            출제자는 2분 이내에 제시된 물건을 가져와 카메라에 인식시켜야 합니다.
          </li>
          <li>먼저 인식을 성공시킨 사람이 점수를 획득합니다.</li>
          <li>
            제한 시간 동안 조건을 달성한 사람이 없으면, 아무도 점수를 얻지
            못하고 다음 문제로 넘어갑니다.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default TreasureHuntGuideModal;
