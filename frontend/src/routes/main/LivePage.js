import RoomTitleForm from "../../components/LivePage/RoomTitleForm";
import RoomTitleCard from "../../components/LivePage/RoomTitleCard";
import FollowingHostCard from "../../components/LivePage/FollowingHostCard";
import FollowersContainer from "../../components/LivePage/FollowersContainer";
import styles from "./LivePage.module.css";
import Navbar from "../../components/navbar/navbar";
import GridGameRoom from "../../components/LivePage/GridGameRoom";

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

      {/* /* ---- 로코파이 ----------- */}
      {/* <div>
        <div className={styles.background2}>
          <div className={styles.frameChild} />
          <div className={styles.vectorParent}>
            <img
              className={styles.frameItem}
              alt=""
              src="../rectangle-191.svg"
            />
            <div className={styles.frameInner} />
          </div>
        </div>
        <div className={styles.groupParent}>
          <div className={styles.parent}>
            <div className={styles.div1}>◁</div>
            <div className={styles.div2}>1</div>
            <div className={styles.div3}>2</div>
            <div className={styles.div4}>3</div>
            <div className={styles.div5}>...</div>
            <div className={styles.div6}>6</div>
            <div className={styles.div7}>▷</div>
          </div>
        </div>
        <div className={styles.group}>
          <b className={styles.b}>
            <span>{`지금 `}</span>
            <span className={styles.span}>노는 중</span>
          </b>
          <RoomTitleForm />
          <RoomTitleCard />
        </div>
        <div className={styles.div8}>
          <b className={styles.b1}>
            <span>팔로잉이</span>
            <span className={styles.span1}> 주최 중</span>
          </b>
          <FollowingHostCard />
        </div>
        <div className={styles.item} />
        <div className={styles.inner} />
        <div className={styles.rectangleDiv} />
        <div className={styles.child1} />
        <FollowersContainer />
        <img
          className={styles.iconUserPlus}
          alt=""
          src="../-icon-user-plus.svg"
        />
        <div className={styles.footer}>
          <div className={styles.playRaonzenaEnjoy}>
            Play RaonZena, Enjoy your times
          </div>
          <div className={styles.decaffeineIncContainer}>
            <p className={styles.decaffeineInc}>
              Decaffeine Inc. 서울시 강남구 역삼 2동 멀티캠퍼스
            </p>
            <p className={styles.decaffeineInc}>
              대표 홍영민 사업자등록번호 XXX-XX-XXXX
            </p>
            <p className={styles.decaffeineInc}>&nbsp;</p>
            <p className={styles.copyrightDecaffeine}>
              Copyright ⓒ Decaffeine Inc. All Right Reserved.
            </p>
          </div>
        </div>
      </div> */}
      {/* /* ---- 로코파이 ----------- */}
    </div>
  );
};

export default LivePage;
