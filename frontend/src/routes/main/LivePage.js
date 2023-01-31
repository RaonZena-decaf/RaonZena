import styles from "./LivePage.module.css";
import Navbar from "../../components/navbar/navbar";
import GameRooms from "../../components/GameRoom/GameRoom";
import FollowingList from "../../components/Followings/FollowingList";
import HostFollowings from "../../components/Followings/HostFollowings";
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
        <div className={styles.displayFlex}>
          <div className={styles.HostfollowingsList}>
            {`팔로잉이 `}
            <b id={styles.pinkcolor}> 주최 중</b>
            <div>
              <HostFollowings></HostFollowings>
            </div>
          </div>
          <div className={styles.followingsList}>
            <div className={styles.No}>
              {`당신의 `}
              <b id={styles.pinkcolor}> 팔로잉</b>
              <FollowingList></FollowingList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePage;
