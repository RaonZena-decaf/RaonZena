import { useEffect } from "react";
import { FaBell } from "react-icons/fa";

import "./Modal.css";

function ShoutInSilenceGuideModal({ closeModal }) {
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
    <div className="shoutInSilenceGuide" id="outside" onClick={closeModal}>
      <div className="modalcontainer" onClick={(e) => e.stopPropagation()}>
        <div className="modaltitle">
          {" "}
          <span>게임 가이드 </span>
          <br />
          고요 속의 외침
        </div>
        <button
          id="modalCloseBtn"
          className="shoutInSilenceGuide"
          onClick={closeModal}
        >
          ✖
        </button>
        <FaBell />
        <ol className="modaltxt">
          <li>
            방장이 화면 하단의 게임 버튼을 클릭 후, 게임의 종류를 선택하면
            게임이 시작됩니다.
          </li>
          <li>
            게임마다 다른 규칙이 적용되므로, 게임 규칙을 미리 숙지하시길
            바랍니다.
          </li>
          <li>참가자들은 게임을 플레이하는 것으로 점수를 얻을 수 있습니다.</li>
          <li>
            방장은 임의로 게임을 중단할 수 있으며, 이 경우 점수는 유지됩니다.
          </li>
          <li>
            누군가 100점이 되면 게임이 종료됩니다. 이후 자동으로 기념사진 촬영이
            진행됩니다. 사진은 게임의 결과와 함께 저장됩니다.
          </li>
          <li>게임이 종료되면 점수가 초기화됩니다.</li>
        </ol>
      </div>
    </div>
  );
}

export default ShoutInSilenceGuideModal;
