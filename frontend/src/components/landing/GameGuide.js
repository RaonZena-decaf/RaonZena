import styles from "./GameGuide.module.css";

function GameGuide({ openModal }) {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselcontainer} >
        <img
          src="./img/Landing/ImageGameGuide.webp"
          alt=""
          id="3"
          onClick={openModal}
        />
        <img
          src="./img/Landing/CatchMindGuide.webp"
          alt=""
          id="4"
          onClick={openModal}
        />
        <img
          src="./img/Landing/ShoutInSilenceGuide.webp"
          alt=""
          id="5"
          onClick={openModal}
        />
        <img
          src="./img/Landing/PersonQuizGuide.webp"
          alt=""
          id="6"
          onClick={openModal}
        />
        <img
          src="./img/Landing/LotteryGuide.webp"
          alt=""
          id="7"
          onClick={openModal}
        />
      </div>
    </div>
  );
}

export default GameGuide;
