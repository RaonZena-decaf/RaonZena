import styles from "./RoomTitleCard.module.css";

const RoomTitleCard = () => {
  return (
    <div className={styles.parent}>
      <div className={styles.div}>방 제목 3/6</div>
      <div className={styles.div1}>방 제목 6/6</div>
      <div className={styles.div2}>방 제목 3/6</div>
      <img className={styles.groupChild} alt="" src="../rectangle-731@2x.png" />
      <img className={styles.groupItem} alt="" src="../rectangle-741@2x.png" />
      <img className={styles.groupInner} alt="" src="../rectangle-751@2x.png" />
      <img
        className={styles.rectangleIcon}
        alt=""
        src="../rectangle-771@2x.png"
      />
      <div className={styles.div3}>
        <p className={styles.p}>방 제목 3/6</p>
        <p className={styles.p1}>두 줄까지 구현함</p>
      </div>
      <img
        className={styles.groupChild1}
        alt=""
        src="../rectangle-781@2x.png"
      />
      <div className={styles.div4} />
      <img className={styles.iconUser} alt="" src="../-icon-user.svg" />
      <img className={styles.iconUser1} alt="" src="../-icon-user.svg" />
      <img className={styles.iconUser2} alt="" src="../-icon-user.svg" />
      <img className={styles.iconUser3} alt="" src="../-icon-user.svg" />
      <img className={styles.iconUser4} alt="" src="../-icon-user.svg" />
    </div>
  );
};

export default RoomTitleCard;
