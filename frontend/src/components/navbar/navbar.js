import React, { useState } from 'react';
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  // 페이지 이동을 위한 함수들
  const navigate = useNavigate();

  const navigateToLanding = () => {
    navigate("/");
  };
  // 검색 기능을 위한 함수
  const enterSearch = (event) => {
    event.preventDefault();
    if (search) {
      console.log(search)
      // navigate("/landing/")
      return
    }
  };
  const [search, setSearch] = useState('');
  const onChangeSearch = (event) => {
    event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <div className={styles.div}>
      <div className={styles.navbar}>
        <div className={styles.groupParent} onClick={navigateToLanding}>
          <div className={styles.rectangleWrapper}>
            <img
              className={styles.groupChild}
              alt=""
              src="../rectangle-1@2x.png"
            />
          </div>
          <b className={styles.raonzena}>RaonZena</b>
        </div>
        <div className={styles.groupContainer}>
          <div className={styles.rectangleParent}>
            <div className={styles.groupItem} />
            <form onSubmit={enterSearch}>
              <input
                className={styles.searchRooms}
                placeholder="Search Rooms"
                value={search}
                onChange={onChangeSearch}
              ></input>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={styles.iconSearch}
                  onClick={enterSearch}
                />
            </form>
          </div>
          <div className={styles.home}>Home</div>
          <div className={styles.home}>Live</div>
          <div className={styles.rectangleGroup}>
            <div className={styles.groupInner} />
            <FontAwesomeIcon
              icon={faCircleUser}
              className={styles.iconUserCircle}
            />
            <div className={styles.profile}>Profile</div>
          </div>
          <div className={styles.rectangleContainer}>
            <div className={styles.rectangleDiv} />
            <div className={styles.createRoom}>Create Room</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
