import { memo } from "react"
import RadarAnimation from "../animaition/Radar";
import styles from "./Modal.module.css";


function NoResult() {
  return(
    <div className={styles.noResult}>
      검색 결과가 없습니다. <br/>
      친구에게 코드를 물어보세요!
      <RadarAnimation/>
    </div>
  )
}

export default memo(NoResult)