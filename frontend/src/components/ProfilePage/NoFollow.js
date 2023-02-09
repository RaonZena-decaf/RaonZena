import styles from "./NoFeed.module.css";
import AstronautAnimation from "../animaition/Astronaut";
import { memo } from "react";

function NoFollow() {

  return (
    <div className={styles.background}>
      <AstronautAnimation/>
      <div className={styles.text1}>아무도 없어요</div> 
      <div className={styles.text}>방에 참여해서 친구를 만들어 봅시다!</div> 
    </div>
  );
}

export default memo(NoFollow);
