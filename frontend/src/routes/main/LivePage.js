import styles from "./LivePage.module.css";
import Navbar from "../../components/navbar/navbar";
import GameRooms from "../../components/GameRoom/GameRoom";

const LivePage = () => {
  return (
    <div className={styles.background}>
      <Navbar />
      <div className={styles.background2}>
        <div className={styles.background3}>
          <div className={styles.NowPlayingTitle}>
            {`지금 `}
            <b id={styles.pinkcolor}> 노는 중</b>
            <GameRooms className={styles.center}></GameRooms>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
