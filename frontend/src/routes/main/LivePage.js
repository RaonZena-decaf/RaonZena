import styles from "./LivePage.module.css";
import Navbar from "../../components/navbar/navbar";
import GridGameRoom from "../../components/GameRoom/GridGameRoom2";

const LivePage = () => {
  return (
    <div className={styles.background}>
      <Navbar />
      <div className={styles.background2}>
        <div className={styles.background3}>
          <div className={styles.NowPlayingTitle}>
            {`지금 `}
            <b id={styles.pinkcolor}> 노는 중</b>
            <GridGameRoom></GridGameRoom>
          </div>
        </div>

        <div className={styles.background3}></div>
      </div>
      \
    </div>
  );
};

export default LivePage;
