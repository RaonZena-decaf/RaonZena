import { useState } from "react";
import styles from "./PhotoShoot.module.css";
import PhotoShootDiary from "./PhotoShootDiary";
import PhotoShootLayout from "./PhotoShootLayout";

function Photoshoot({closeMenu}) {
  const [photoFrame, setPhotoFrame] = useState(1)

  return (
    <div className={styles.photoshootbackground}>
      <div className={styles.photoshootFont}>사진 촬영 완료!</div>
      <div className={styles.photoshootflex}>
        <PhotoShootLayout photoFrame={photoFrame}/>
        <PhotoShootDiary closeMenu={closeMenu} setPhotoFrame={setPhotoFrame}/>
      </div>
    </div>
  );
}

export default Photoshoot;
