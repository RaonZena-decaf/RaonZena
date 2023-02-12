import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import Navbar from "../../components/navbar/navbar";
import UserGuide from "../../components/landing/UserGuide";
import ModalPortal from "../../components/Modal/Portal";
import { Transition } from "react-transition-group";
import GuideModalFrame from "../../components/Modal/GuideModalFrame";
import VideoChat from "../../components/animaition/VideoChat.js";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import GameGuide from "../../components/landing/GameGuide";

function Landing() {
  //로그인 함수
  const user = useSelector((store) => store.userData);

  const loginConfigure = () => {
    if (user.userNo === "") {
      return false;
    } else {
      return true;
    }
  };
  const isLogin = loginConfigure();

  const redirectUrl = useSelector((store) => store.redirectUrl);
  const Login = () => {
    const REST_API_KEY = "c271efde78c62f250965bf71db6657fb";
    const REDIRECT_URI = `${redirectUrl}/oauth/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
    if (typeof window !== "undefined") {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  //모달 표시를 위한 함수 및 변수
  const [modalOn, setModalOn] = useState(false);
  const [nowContent, setNowContent] = useState(0);
  const openModal = (event) => {
    setNowContent(parseInt(event.target.id));
    setModalOn(true);
  };

  //모달을 닫는 함수
  const closeModal = () => {
    setModalOn(false);
  };

  //로그인 여부에 따른 라우터 변경
  const navigate = useNavigate();
  const loginCheck = () => {
    if (isLogin) {
      navigate("/live");
    } else {
      Login();
    }
  };

  //스크롤 이벤트 감지

  useEffect(() => {
    const landpage = document.querySelector("#landpage");
    const guidepage = document.querySelector("#guidepage");
    const firstpage = document.querySelector("#firstpage");

    function handleWheel1(e) {
      e.preventDefault();
      if (e.deltaY > 0) {
        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    }

    landpage.addEventListener("wheel", handleWheel1, { passive: false });

    function handleWheel2(e) {
      e.preventDefault();

      if (e.deltaY > 0) {
        guidepage.scrollBy({
          left: window.innerWidth * 0.83,
          behavior: "smooth",
        });
      } else {
        guidepage.scrollBy({
          left: -window.innerWidth * 0.83,
          behavior: "smooth",
        });
      }
    }
    guidepage.addEventListener("wheel", handleWheel2, { passive: false });

    function handleWheel3(e) {
      e.preventDefault();
      if (e.deltaY < 0) {
        window.scrollBy({
          top: -window.innerHeight,
          behavior: "smooth",
        });
      }
    }
    firstpage.addEventListener("wheel", handleWheel3, { passive: false });

  }, []);
  //무작위 난수 생성
  function randomNum(min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
  }

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.grid} id="landpage">
          {Array.from(Array(200)).map((x, index) => (
            <div
              key={index}
              className={styles.gridItems}
              style={{ animationDelay: `${randomNum(1, 15)}s` }}
            ></div>
          ))}
          <div className={styles.popupanimation}>
            <img
              alt=""
              src="./404Logo.png"
              className={`${styles.clockanimation} ${styles.LandingLogo}`}
            />
            <div className={styles.Main}>RaonZena</div>
            <div className={styles.Main2}>Connect Us, Connect Times</div>
            <div className={styles.Sub} onClick={loginCheck}>
              Click To Start
            </div>
            <div
              className={styles.arrow}
              onClick={() => {
                window.scrollBy({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              ▼
            </div>
          </div>
        </div>
        <div className={styles.background3} id="guidepage">
          <div className={styles.background2} id="firstpage">
            <p id={styles.serviceintro}>서비스 소개</p>
            <p className={styles.title} id={styles.pinkcolor}>
              우리들을 잇다, 즐거움을 잇다
            </p>
            <p className={styles.subtitle}>화상을 통해 만드는 이어짐</p>
            <div className={styles.maintextcontainer}>
              <div className={styles.maintext2}>
                라온제나는 유저분들 간의 시간과 즐거움을 잇는 서비스입니다.
                간단한 게임을 즐기며, 함께 사진을 찍어 여러 프레임에 보관할 수
                있습니다. 소소한 이야기를 나눌 수 있는 작은 관계로부터 이어짐의
                즐거움을 느껴 보세요.
              </div>
              <VideoChat />
            </div>
          </div>

          <div className={styles.background2}>
            <p id={styles.serviceintro}>이용 가이드</p>
            <UserGuide openModal={openModal} />
          </div>

          <div className={styles.background2}>
            <p id={styles.serviceintro}>게임 가이드</p>
            <GameGuide openModal={openModal} />
          </div>
        </div>
        <ModalPortal>
          <Transition unmountOnExit in={modalOn} timeout={500}>
            {(state) => (
              <GuideModalFrame
                show={state}
                closeModal={closeModal}
                nowContent={nowContent}
              />
            )}
          </Transition>
        </ModalPortal>
      </div>
    </>
  );
}

export default React.memo(Landing);
