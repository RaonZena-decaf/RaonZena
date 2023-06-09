import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./navbar.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaPowerOff,
  FaHome,
  FaInfoCircle,
  FaClinicMedical,
} from "react-icons/fa";
import { initUserData } from "../../app/userData";
import { initMyFollowingList } from "../../app/myFollowingList";
import axios from "axios";

const Navbar = () => {
  //유저정보 가져오기
  const user = useSelector((store) => store.userData);
  const baseUrl = useSelector((store) => store.baseUrl);

  const navigate = useNavigate();
  const loginConfigure = () => {
    if (user.userNo === "") {
      return false;
    } else {
      return true;
    }
  };
  const isLogin = loginConfigure();

  // 페이지 이동을 위한 함수들
  const navigateToLanding = () => {
    if (nowContent.pathname === "/") {
      window.location.replace("/");
    } else {
      navigate("/");
    }
  };
  const navigateToLive = () => {
    navigate("/live");
  };

  const navigateToProfile = () => {
    navigate(`/profile/${user.userNo}`);
  };

  //로그인함수
  const redirectUrl = useSelector((store) => store.redirectUrl);
  const REST_API_KEY = "c271efde78c62f250965bf71db6657fb";
  const REDIRECT_URI = `${redirectUrl}/oauth/kakao/callback`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  const Login = () => {
    if (typeof window !== "undefined") {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  const dispatch = useDispatch();
  //로그아웃
  const [animation, setAnimation] = useState("");
  const logout = () => {
    axios({
      method: "GET",
      url: `${baseUrl}user/logout`,
    })
      .then((res) => {
      })
      .catch((error) => console.log(error));
    setAnimation("wash");
    setTimeout(() => {
      dispatch(initUserData());
    }, 1000);
    dispatch(initMyFollowingList([]));
    setTimeout(() => {
      navigateToLanding();
      setAnimation("");
    }, 1900);
  };

  const navigateToCreateRoom = () => {
    navigate("/makeroom");
  };
  // 검색 기능을 위한 함수
  const enterSearch = (event) => {
    event.preventDefault();
    // 입력값을 들고 live로 이동
    setSearchBar(false);
    navigate("/live", { state: search });
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
  const activerouter3 = [nowContent.pathname === "/makeroom" ? "active" : null];

  // 검색 바 출력 용
  const [searchBar, setSearchBar] = useState(false);
  const activerouter4 = [searchBar === true ? "active" : null];
  const searchBarOpen = () => {
    setSearchBar(!searchBar);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.Logo} onClick={navigateToLanding}>
        <img className={styles.LogoImg} alt="" src="../img/logo.png" />
        <p className={styles.LogoTitle}>RaonZena</p>
      </div>
      <div className={styles.rightSide}>
        <div className={`${styles.router} ${styles[activerouter]}`}>
          <FaInfoCircle onClick={navigateToLanding} />
          <div className={styles.routerName}>소개</div>
        </div>

        <div className={`${styles.router} ${styles[activerouter2]}`}>
          <FaHome onClick={navigateToLive} />
          <div className={styles.routerName}>홈</div>
        </div>

        {isLogin ? (
          <div className={`${styles.router} ${styles[activerouter3]}`}>
            <FaClinicMedical onClick={navigateToCreateRoom} />
            <div className={styles.routerName}>만들기</div>
          </div>
        ) : null}
        <div className={`${styles.router} ${styles[activerouter4]}`}>
          <FaSearch onClick={searchBarOpen} />
          <div className={styles.routerName}>검색</div>
        </div>
        {searchBar ? (
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
        ) : null}
        {isLogin ? (
          <div className={styles.logout}>
            <FaPowerOff onClick={logout} />
            <div className={styles.routerName}>로그아웃</div>
          </div>
        ) : (
          <img
            className={styles.Login}
            onClick={Login}
            src="../img/kakao_login_medium.png"
            alt="kakaologin"
          />
        )}
        {isLogin ? (
          <div className={styles.router}>
            <img
              src={user.userImage}
              alt="profileimg"
              className={styles.profileimg}
              onClick={navigateToProfile}
            />
            <div className={styles.routerName}>프로필</div>
          </div>
        ) : null}
      </div>
      <div className={`${styles.wave} ${styles[`${animation}1`]}`}></div>
      <div className={`${styles.wave2} ${styles[`${animation}1-1`]}`}></div>
      <div className={`${styles.wave} ${styles[`${animation}2`]}`}></div>
      <div className={`${styles.wave2} ${styles[`${animation}2-2`]}`}></div>
      <div className={`${styles.wave3} ${styles[`${animation}3`]}`}>
        <div className={styles.logoutComment}>See you next time!</div>
      </div>
    </div>
  );
};

export default Navbar;
