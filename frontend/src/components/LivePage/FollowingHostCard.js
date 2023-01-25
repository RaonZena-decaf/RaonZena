import styles from "./FollowingHostCard.module.css";

const FollowingHostCard = () => {
  return (
    <div className={styles.groupParent}>
      <div className={styles.rectangleParent}>
        <img
          className={styles.groupChild}
          alt=""
          src="../rectangle-87@2x.png"
        />
        <div className={styles.div}>방 제목 3/6</div>
        <img
          className={styles.iconUserCircle}
          alt=""
          src="../-icon-user-circle.svg"
        />
        <div className={styles.lv3Container}>
          <span className={styles.lv3Container1}>
            <p className={styles.lv3}>{`Lv 3 `}</p>
            <p className={styles.p}>친구 유저 명</p>
          </span>
        </div>
        <img className={styles.iconUser} alt="" src="../-icon-user.svg" />
      </div>
      <div className={styles.rectangleGroup}>
        <img
          className={styles.groupChild}
          alt=""
          src="../rectangle-95@2x.png"
        />
        <div className={styles.div}>방 제목 3/6</div>
        <div className={styles.lv12Container}>
          <span className={styles.lv3Container1}>
            <p className={styles.lv3}>Lv 12</p>
            <p className={styles.p}>친구 유저 명</p>
          </span>
        </div>
        <img
          className={styles.iconUserCircle1}
          alt=""
          src="../-icon-user-circle1.svg"
        />
        <img className={styles.iconUser1} alt="" src="../-icon-user.svg" />
      </div>
      <div className={styles.rectangleParent}>
        <img
          className={styles.groupChild}
          alt=""
          src="../rectangle-90@2x.png"
        />
        <div className={styles.div}>방 제목 3/6</div>
        <div className={styles.lv33Parent}>
          <div className={styles.lv33Container}>
            <span className={styles.lv3Container1}>
              <p className={styles.lv3}>Lv 33</p>
              <p className={styles.p}>친구 유저 명</p>
            </span>
          </div>
          <img
            className={styles.iconUserCircle2}
            alt=""
            src="../-icon-user-circle2.svg"
          />
        </div>
        <img className={styles.iconUser} alt="" src="../-icon-user.svg" />
      </div>
    </div>
  );
};

export default FollowingHostCard;
