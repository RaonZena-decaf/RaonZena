import styles from "./ProfileModal.module.css";
import ProfilePostDetail from "./ProfilePostDetail";
import ProfileFollowingListDetail from "./ProfileFollowingListDetail";
import ProfileFollowerListDetail from "./ProfileFollowerListDetail";
import { useEffect } from "react";

function ProfileModal({ show, handleClose, nowContent, follower, following }) {
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

  return (
    <div
      className={`${styles.outside} ${styles[fadeAnimation]}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.modalContainer} ${styles[slide]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {nowContent && <ProfilePostDetail nowContent={nowContent} handleClose={handleClose}/>}
        {following && <ProfileFollowingListDetail following={following} handleClose={handleClose}/>}
        {follower && <ProfileFollowerListDetail follower={follower} handleClose={handleClose}/>}
      </div>
    </div>
  );
}

export default ProfileModal;
