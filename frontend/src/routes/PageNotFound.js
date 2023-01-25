import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="background">
      <img alt="로고" src="./404Logo.png" className="logosize" />
      <p className="gradient fontsize">이런, 여기는 아무도 없네요.</p>
      <br></br>
      <br></br>
      <p className="fontsize2">페이지를 찾을 수 없습니다.</p>
      <p className="fontsize2">존재하지 않는 주소를 입력하셨거나,</p>
      <p className="fontsize2">
        요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
      </p>
      <Link to="/" className="pinkcolor">
        <p>홈으로 돌아가기 →</p>
      </Link>
      <p className="fontsize2">
        혼자만의 시간을 가지고 싶으시다면, 잠시 머무르셔도 좋습니다.
      </p>
      <br></br>
      <br></br>
    </div>
  );
}

export default PageNotFound;
