import "./UserGuide.css";
import { useEffect, useRef, useState } from "react";

function UserGuide({ openModal }) {
  const containerCarosel = useRef();
  const [nowX, setNowX] = useState(0);

  //스크롤링 함수
  useEffect(() => {
    containerCarosel.current.style.transform = `translateX(${nowX}vw)`;
  }, [nowX]);

  // 인디케이터
  const pageBtn1 = useRef();
  const pageBtn2 = useRef();
  const pageBtn3 = useRef();

  const clickbutton1 = () => {
    setNowX((prop) => (prop = 0));
    pageBtn1.current.style.backgroundColor = "#F400B0";
    pageBtn2.current.style.backgroundColor = "#cacaca";
    pageBtn3.current.style.backgroundColor = "#cacaca";
  };
  const clickbutton2 = () => {
    setNowX((prop) => (prop = -69.1));
    pageBtn2.current.style.backgroundColor = "#F400B0";
    pageBtn1.current.style.backgroundColor = "#cacaca";
    pageBtn3.current.style.backgroundColor = "#cacaca";
  };
  const clickbutton3 = () => {
    setNowX((prop) => (prop = -138.6));
    pageBtn3.current.style.backgroundColor = "#F400B0";
    pageBtn2.current.style.backgroundColor = "#cacaca";
    pageBtn1.current.style.backgroundColor = "#cacaca";
  };

  return (
    <div className="carousel">
      <div className="carouselcontainer" ref={containerCarosel}>
        <img
          src="./img/Landing/GameGuide.png"
          alt=""
          id="0"
          onClick={openModal}
        />
        <img
          src="./img/Landing/PhotoGuide.png"
          alt=""
          id="1"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ChattingGuide.png"
          alt=""
          id="2"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ImageGameGuide.png"
          alt=""
          id="3"
          onClick={openModal}
        />
        <img
          src="./img/Landing/TresureHuntGuide.png"
          alt=""
          id="4"
          onClick={openModal}
        />
        <img
          src="./img/Landing/CatchMindGuide.png"
          alt=""
          id="5"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ShoutInSilenceGuide.png"
          alt=""
          id="6"
          onClick={openModal}
        />
        <img
          src="./img/Landing/PersonQuizGuide.png"
          alt=""
          id="7"
          onClick={openModal}
        />
        <img
          src="./img/Landing/LotteryGuide.png"
          alt=""
          id="8"
          onClick={openModal}
        />
      </div>
      <div className="buttonlist">
        <div
          className="circlebutton active"
          onClick={clickbutton1}
          ref={pageBtn1}
        ></div>
        <div
          className="circlebutton"
          onClick={clickbutton2}
          ref={pageBtn2}
        ></div>
        <div
          className="circlebutton"
          onClick={clickbutton3}
          ref={pageBtn3}
        ></div>
      </div>
    </div>
  );
}

export default UserGuide;
