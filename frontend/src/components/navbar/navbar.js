import React, { useState } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Dropdown from "./dropdown";

const Navbar = () => {
  // 페이지 이동을 위한 함수들
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("token"));

  const navigateToLanding = () => {
    navigate("/");
  };
  const navigateToLive = () => {
    navigate("/live");
  };

  // const navigateToNoDataLive = () => {
  //   navigate("/NoDataLive");
  // };


  const navigateToProfile = () => {
    const userId = 1; // 현재 접속중인 유저 id를 가져와야 한다 redux든 아니면 back과의 통신이든
    navigate(`/profile/:${userId}`);
  };

  const [dropDown, setDropDown] = React.useState(false);

  const Login = () => {
    const REST_API_KEY = "507ec57801bf562750f3dea88a7c2b99";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    if (typeof window !== "undefined") {
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  const navigateToCreateRoom = () => {
    navigate("/room");
  };
  // 검색 기능을 위한 함수
  const enterSearch = (event) => {
    event.preventDefault();
    if (search) {
      console.log(search);
      // navigate("/landing/")
      return;
    }
  };
  const [search, setSearch] = useState("");
  const onChangeSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.groupContainer}>
          <div className={styles.groupParent} onClick={navigateToLanding}>
            <img className={styles.groupChild} alt="" src="../img/logo.png" />
            <b className={styles.raonzena}>RaonZena</b>
          </div>
          <div className={styles.home} onClick={navigateToLanding}>
            홈
          </div>
          <div className={styles.home} onClick={navigateToLive}>
            라이브
          </div>
          {/* <div className={styles.home} onClick={navigateToNoDataLive}>
            라이브 X
          </div> */}

            <div>
              <ul className={styles.nav_ul}>
                <li className={styles.nav_ul_li} onClick={navigateToLanding}>
                  홈
                </li>
                <li className={styles.nav_ul_li} onClick={navigateToLive}>
                  라이브
                </li>
                <li>
                  <form onSubmit={enterSearch}>
                    <input
                      className={styles.searchRooms2}
                      placeholder="방 이름으로 검색"
                      value={search}
                      onChange={onChangeSearch}
                    ></input>
                  </form>
                </li>
              </ul>
            </div>

            <div className={styles.rectangleParent}>
              {isLogin ? (
                <div className={styles.groupContainer}>
                  <div
                    className={styles.rectangleContainer}
                    onClick={navigateToCreateRoom}
                  >
                    <div className={styles.rectangleDiv} />
                    <div className={styles.createRoom}>방 만들기</div>
                  </div>
                </div>
              ) : (
                <div className={styles.rectangleGroup} onClick={Login}>
                  <img src="../img/kakao_login_medium.png" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
