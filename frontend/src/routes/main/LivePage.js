import styles from "./LivePage.module.css";
import Navbar from "../../components/navbar/navbar";
import GameList from "../../components/GameList/GameList";
import FollowingList from "../../components/Followings/FollowingList";
import HostFollowings from "../../components/Followings/HostFollowingGames";
import Footer from "../../components/Footer";
import ModalPortal from "../../components/Modal/Portal";
import { Transition } from "react-transition-group";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import SearchModalFrame from "../../components/Modal/SearchModalFrame";

const LivePage = () => {
  const { state } = useLocation();

  //모달 표시를 위한 함수
  const [modalOn, setModalOn] = useState(false);
  const openModal = () => {
    setModalOn(true);
  };

  //모달을 닫는 함수
  const closeModal = () => {
    setModalOn(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.background2}>
          <div className={styles.background3}>
            <div className={styles.NowPlayingTitle}>
              {state === null ? (
                <>
                  {`Now `}
                  <b id={styles.pinkcolor}> Playing</b>
                </>
              ) : (
                <>
                  {`Search `}
                  <b id={styles.pinkcolor}> Result</b>
                  <span className={styles.searchWord}>{state}</span>
                </>
              )}
              <GameList searchWord={state} />
            </div>
          </div>
          <div className={styles.displayFlex}>
            <div className={styles.HostfollowingsList}>
              <div>
                {`Followings' `}
                <b id={styles.pinkcolor}> Rooms</b>
              </div>
              <HostFollowings />
            </div>
            <div className={styles.followingsList}>
              <div className={styles.followingsListTitle}>
                <div>
                  {`Your`}
                  <b id={styles.pinkcolor}> Followings</b>
                </div>
                <FaSearch className={styles.followSearch} onClick={openModal} />
              </div>
              <FollowingList />
            </div>
          </div>
        </div>
        <Footer />

        <ModalPortal>
          <Transition unmountOnExit in={modalOn} timeout={500}>
            {(state) => (
              <SearchModalFrame show={state} closeModal={closeModal} />
            )}
          </Transition>
        </ModalPortal>
      </div>
    </>
  );
};

export default LivePage;
