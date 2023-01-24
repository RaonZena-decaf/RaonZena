import styles from "./NoDataLivePage.module.css";
import Navbar from "../navbar/navbar";

const NoDataLivePage = () => {
  return (
    <div className={styles.div}>
      <img className={styles.child} alt="" src="../rectangle-19.svg" />
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.vectorParent}>
          <img className={styles.frameItem} alt="" src="../rectangle-191.svg" />
          <div className={styles.frameInner} />
        </div>
      </div>
      <div className={styles.iconCommentDotsParent}>
        <img
          className={styles.iconCommentDots}
          alt=""
          src="../-icon-comment-dots.svg"
        />
        <div className={styles.div1}>
          <p className={styles.p}>열려 있는 방이 없습니다</p>
          <p className={styles.copyrightDecaffeine}>
            방을 만들고 친구들을 불러보세요!
          </p>
        </div>
        <div className={styles.vectorGroup}>
          <img className={styles.groupChild} alt="" src="../rectangle-21.svg" />
          <div className={styles.div2}>방 만들기</div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <b className={styles.b}>
          <span>{`지금 `}</span>
          <span className={styles.span}>노는 중</span>
        </b>
      </div>
      <div className={styles.div3}>
        <b className={styles.b1}>
          <span>팔로잉이</span>
          <span className={styles.span1}> 주최 중</span>
        </b>
      </div>
      <div className={styles.footer}>
        <div className={styles.playRaonzenaEnjoy}>
          Play RaonZena, Enjoy your times
        </div>
        <div className={styles.decaffeineIncContainer}>
          <p className={styles.p}>
            Decaffeine Inc. 서울시 강남구 역삼 2동 멀티캠퍼스
          </p>
          <p className={styles.p}>대표 홍영민 사업자등록번호 XXX-XX-XXXX</p>
          <p className={styles.p}>&nbsp;</p>
          <p className={styles.copyrightDecaffeine}>
            Copyright ⓒ Decaffeine Inc. All Right Reserved.
          </p>
        </div>
      </div>
      <div className={styles.iconUsersSlashParent}>
        <img
          className={styles.iconUsersSlash}
          alt=""
          src="../-icon-users-slash.svg"
        />
        <div className={styles.div4}>등록한 친구가 없습니다</div>
      </div>
      <div className={styles.iconTimesCircleParent}>
        <img
          className={styles.iconTimesCircle}
          alt=""
          src="../-icon-times-circle.svg"
        />
        <div className={styles.div1}>지금 놀고 있는 친구가 없습니다</div>
      </div>
      <b className={styles.b2}>
        <span>{`당신의 `}</span>
        <span className={styles.span}>팔로잉</span>
      </b>
      <img
        className={styles.iconUserPlus}
        alt=""
        src="../-icon-user-plus.svg"
      />
      <Navbar></Navbar>
    </div>
  );
};

export default NoDataLivePage;
