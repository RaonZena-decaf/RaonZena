import styles from "./NoFeed.module.css";
import AstronautAnimation from "../animaition/Astronaut";
import { memo } from "react";

function NoFeed() {

  return (
    <div className={styles.background}>
      <AstronautAnimation/>
      <div className={styles.text1}>아직 아무런 기록이 없어요.</div> 
      <div className={styles.text}>여러분만의 사진으로 기록을 남겨보세요!</div> 
    </div>
  );
}

export default memo(NoFeed);
