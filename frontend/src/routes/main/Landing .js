import React from "react";
import "./Landing.css"
import Navbar from "../../features/Navbar"
import Footer from "../../features/Footer";
import UserGuide from "../../features/UserGuide"


function Landing (){
  return (
    <div className="background">
      <Navbar/>
      <div className="background2">
        <div className="background3">
          <div className="box1">
            <p className="gradient">
              {`간편하게 시작하는 온라인 모임`}
            </p>
            <p className="title">
              라온제나에서 즐겨보세요!
            </p>
            <button className="pinkbutton">시작하기</button>
          </div>
        </div>
        <div className="background3">
          <p id="service">서비스 소개</p>
          <p className="title" id="pinkcolor">화상 채팅으로 간편하게 즐겨요</p>
          <p className="subtitle">게임과 사진으로 더욱 친밀하게</p>
          <div id="imageconfig">
            <div className="maintext2">
              <p>라온제나는 이용자분들이 더욱 특별한 시간을</p>
              <p>보낼 수 있도록 돕는 기능을 제공합니다.</p>
              <p>간단한 게임을 즐기거나, 같이 사진을 찍어서 보관해 보세요.</p>
              <p>무슨 이야기를 할 지 모르시겠다구요?</p>
              <p>초대면이라도 쉽게 말문이 트이는 주제들이 제공됩니다!</p>
            </div>
            {/* <img
              className="LandingImage1"
              alt=""
              src="./Landing/LandingImage1.png"/> */}
          </div>
        </div>
        <div className="background3">
          <UserGuide/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Landing 