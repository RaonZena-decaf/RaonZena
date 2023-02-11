import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer";
import UserGuide from "../../components/landing/UserGuide";
import ModalPortal from "../../components/Modal/Portal";
import { Transition } from "react-transition-group";
import GuideModalFrame from "../../components/Modal/GuideModalFrame";
import VideoChat from "../../components/animaition/VideoChat.js";
import { useSelector } from "react-redux";


function Landing() {
  //로그인 함수
  const user = useSelector((store) => store.userData);

  const loginConfigure = () => {
    if (user.userNo === "") {
      return false
    } else {
      return true
    }
  }
  const isLogin = loginConfigure()  

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

  return (
    <>
      <Navbar/>
      <div className={styles.background}>
        <div className={styles.background2}>
          <div className={styles.background3}>
            <div className={styles.box1}>
              <p className={styles.gradient}>{`간편하게 시작하는 온라인 모임`}</p>
              <p className={styles.title}>라온제나에서 즐겨보세요!</p>
              <button className={styles.pinkbutton} onClick={loginCheck}>
                시작하기
              </button>
            </div>
          </div>
          <div className={styles.background3}>
            <p id={styles.serviceintro}>서비스 소개</p>
            <p className={styles.title} id={styles.pinkcolor}>
              화상 채팅으로 간편하게 즐겨요
            </p>
            <p className={styles.subtitle}>게임과 사진으로 더욱 친밀하게</p>
            <div className={styles.maintextcontainer}>
              <div className={styles.maintext2}>
                  라온제나는 이용자분이 더욱 특별한 시간을 보낼 수 있도록 돕는
                  기능을 제공합니다. 간단한 게임을 즐기거나, 같이 사진을 찍어서
                  보관해 보세요. 무슨 이야기를 해야 될 지 모른다구요? 쉽게 말문이
                  트이는 주제들이 제공됩니다!
              </div>
              <VideoChat/>
            </div>
          </div>
          <div className={styles.background3}>
            <UserGuide openModal={openModal} />
          </div>
        </div>
        <Footer />

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
