import { useEffect } from "react";
import { FaFire } from "react-icons/fa";

import "./Modal.css";

function LotteryGuideModal({ closeModal }) {
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
    <div className="lotteryGuide" id="outside" onClick={closeModal}>
      <div className="modalcontainer" onClick={(e) => e.stopPropagation()}>
        <div className="modaltitle">
          {" "}
          <span>게임 가이드 </span>
          <br />
          역전의 한 방!
        </div>
        <button
          id="modalCloseBtn"
          className="lotteryGuide"
          onClick={closeModal}
        >
          ✖
        </button>
        <FaFire />
        <ol className="modaltxt">
          <li>모든 참가자에게 8장의 카드가 제시됩니다.</li>
          <li>점수가 낮은 참가자부터 카드를 선택합니다.</li>
          <li>
            각 카드는 다양한 효과를 지니고 있습니다. 기울어진 판세를 뒤집을
            강력한 효과부터, 전혀 도움이 되지 않을 효과가 적혀 있을 수도
            있습니다. 반전이 필요한 타이밍을 잘 골라 진행해 봅시다!
          </li>
          <li>
            각 참가자가 카드를 선택할 때마다 카드의 효과가 공개되며, 효과가
            적용됩니다.
          </li>
          <li>모든 참가자가 카드를 선택할 때 까지 반복합니다.</li>
        </ol>
      </div>
    </div>
  );
}

export default LotteryGuideModal;
