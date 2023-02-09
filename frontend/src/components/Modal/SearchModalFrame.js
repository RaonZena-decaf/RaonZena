import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { FaSearch } from "react-icons/fa";
import SearchResult from "./SearchResult";

const SearchModalFrame = ({ show, closeModal }) => {
  const fadeAnimation = [
    show === "entering"
      ? "ModalOpen"
      : show === "exiting"
      ? "ModalClose"
      : null,
  ];
  const slide = [
    show === "entering"
      ? "ModalSlideIn"
      : show === "exiting"
      ? "ModalSlideOut"
      : null,
  ];

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  let fadeAnimationClass = fadeAnimation.join(" ");
  let slideAnimationClass = slide.join(" ");

  const [search, setSearch] = useState("");
  const onChangeSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  //엔터 입력으로 인한 페이지 새로고침 방지
  const enterSearch = (event) => {
    event.preventDefault();
  };

  

  return (
    <div className={`${styles[fadeAnimationClass]} ${styles.zindex}`}>
      <div
        className={styles.gameGuide}
        id={styles.outside}
        onClick={closeModal}
      >
        <div
          className={`${styles[slideAnimationClass]} ${styles.modalcontainer} ${styles.spacebetween}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.searchHeader}>
            <div>User <span className={styles.highlight}>Search</span></div>
            <form className={styles.searchforms} onSubmit={enterSearch}>
              <input
                className={styles.searchPerson}
                placeholder="친구 코드로 검색"
                value={search}
                onChange={onChangeSearch}
              ></input>
              <FaSearch className={styles.lens} />
            </form>
          </div>
          <button
            id={styles.modalCloseBtn}
            className={styles.catchMindGuide}
            onClick={closeModal}
          >
            ✖
          </button>
          <SearchResult search={search} closeModal={closeModal}/>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SearchModalFrame);
