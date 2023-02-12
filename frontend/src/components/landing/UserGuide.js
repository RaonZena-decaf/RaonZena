import styles from "./UserGuide.module.css";
function UserGuide({ openModal }) {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselcontainer}>
        <img
          src="./img/Landing/GameGuide.webp"
          alt=""
          id="0"
          onClick={openModal}
        />
        <img
          src="./img/Landing/PhotoGuide.webp"
          alt=""
          id="1"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ChattingGuide.webp"
          alt=""
          id="2"
          onClick={openModal}
        />
      </div>
    </div>
  );
}

export default UserGuide;
