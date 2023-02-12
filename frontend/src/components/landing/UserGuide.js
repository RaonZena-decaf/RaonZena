import styles from "./UserGuide.module.css";
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
    setNowX((prop) => (prop = -72.3));
    pageBtn2.current.style.backgroundColor = "#F400B0";
    pageBtn1.current.style.backgroundColor = "#cacaca";
    pageBtn3.current.style.backgroundColor = "#cacaca";
  };
  const clickbutton3 = () => {
    setNowX((prop) => (prop = -145.3));
    pageBtn3.current.style.backgroundColor = "#F400B0";
    pageBtn2.current.style.backgroundColor = "#cacaca";
    pageBtn1.current.style.backgroundColor = "#cacaca";
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselcontainer} ref={containerCarosel}>
        <img
          src="./img/Landing/GameGuide.webp"
          alt=""
          id="0"
          onClick={openModal}
        />
        <img
          src="./img/Landing/PhotoGuide.webp"
          alt=""
          id="1"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ChattingGuide.webp"
          alt=""
          id="2"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ImageGameGuide.webp"
          alt=""
          id="3"
          onClick={openModal}
        />
        <img
          src="./img/Landing/CatchMindGuide.webp"
          alt=""
          id="4"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ShoutInSilenceGuide.webp"
          alt=""
          id="5"
          onClick={openModal}
        />
        <img
          src="./img/Landing/PersonQuizGuide.webp"
          alt=""
          id="6"
          onClick={openModal}
        />
        <img
          src="./img/Landing/LotteryGuide.webp"
          alt=""
          id="7"
          onClick={openModal}
        />
      </div>
      <div className={styles.buttonlist}>
        <div
          className={`${styles.circlebutton} ${styles.active}`}
          onClick={clickbutton1}
          ref={pageBtn1}
        ></div>
        <div
          className={styles.circlebutton}
          onClick={clickbutton2}
          ref={pageBtn2}
        ></div>
        <div
          className={styles.circlebutton}
          onClick={clickbutton3}
          ref={pageBtn3}
        ></div>
      </div>
    </div>
  );
}

export default UserGuide;
