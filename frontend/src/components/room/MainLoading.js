import styles from "./MainLoading.module.css"
import RocketAnimation from "../animaition/Rocket.js"
import { memo } from "react"

function MainLoading () {
  return (
    <div className={styles.container}>
      <RocketAnimation/>
      <div className={styles.title}>
        방에 입장하는 중...
      </div>
    </div>
  )
}

export default memo(MainLoading)