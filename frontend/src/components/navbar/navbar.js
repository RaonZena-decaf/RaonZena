import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./navbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { initUserData } from "../../app/userData";

const Navbar = () => {
  //유저정보 가져오기
  const user = useSelector((store) => store.userData);

  const navigate = useNavigate();
  const loginConfigure = () => {
    if (user.userNo === "") {
      return false
    } else {
      return true
    }
  }
  const isLogin = loginConfigure()

  
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(initUserData())
  }
  
  // 페이지 이동을 위한 함수들
  const navigateToLanding = () => {
    navigate("/");
  };
  const navigateToLive = () => {
    navigate("/live");
  };


  const navigateToProfile = () => {
    navigate(`/profile/${user.userNo}`);
  };

  //로그인함수
  const redirectUrl = useSelector((store) => store.redirectUrl)
  const Login = () => {
    const REST_API_KEY = "c271efde78c62f250965bf71db6657fb";
    const REDIRECT_URI = `${redirectUrl}/oauth/kakao/callback`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    if (typeof window !== "undefined") {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  const navigateToCreateRoom = () => {
    navigate("/makeroom");
  };
  // 검색 기능을 위한 함수
  const enterSearch = (event) => {
    event.preventDefault();
      // 입력값을 들고 live로 이동
    navigate("/live", {state:search})
  };


  const [search, setSearch] = useState("");
  const onChangeSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  // 현재 라우터 위치에 따른 색 변경 함수
  let nowContent = useLocation();

  const activerouter = [nowContent.pathname === "/" ? "active" : null];

  const activerouter2 = [nowContent.pathname === "/live" ? "active" : null];

  return (
    <div className={styles.navbar}>
      <div className={styles.Logo} onClick={navigateToLanding}>
        <img className={styles.LogoImg} alt="" src="../img/logo.png" />
        <p className={styles.LogoTitle}>RaonZena</p>
      </div>
      <div className={styles.rightSide}>
        <div
          className={`${styles.router} ${styles[activerouter]}`}
          onClick={navigateToLanding}
        >
          Home
        </div>
        <div
          className={`${styles.router} ${styles[activerouter2]}`}
          onClick={navigateToLive}
        >
          Live
        </div>
        <div>
          <form onSubmit={enterSearch} className={styles.searchforms}>
            <input
              className={styles.searchRooms}
              placeholder="방 이름으로 검색"
              value={search}
              onChange={onChangeSearch}
            ></input>
            <button type="submit" className={styles.searchBtn}>
              <FaSearch className={styles.lens} />
            </button>
          </form>
        </div>

        {isLogin ? (
          <>
            <div className={styles.profilebox} onClick={navigateToProfile}>
              <div>{user.userName}</div>
              <img src={user.userImage} alt="profileimg" className={styles.profileimg} />
            </div>
            <div className={styles.createRoom} onClick={navigateToCreateRoom}>
              방 만들기
            </div>
            <div className={styles.createRoom} onClick={logout}>
              로그아웃
            </div>
          </>
        ) : (
          <img
            className={styles.Login}
            onClick={Login}
            src="../img/kakao_login_medium.png"
            alt="kakaologin"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
