import { useState } from "react";
import styles from "./PhotoShoot.module.css";
import PhotoShootDiary from "./PhotoShootDiary";
import PhotoShootLayout from "./PhotoShootLayout";
import { useLayoutEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Photoshoot({closeMenu, TotalUsers}) {
  const [photoFrame, setPhotoFrame] = useState(1)
  const [frames, setFrames] = useState()
  const baseUrl = useSelector((store)=> store.baseUrl)

  useLayoutEffect(()=>{
    async function getFrames() {
      await axios({
        method:"get",
        url:`${baseUrl}games/feed/frame`
      }).then((res)=>{
        setFrames(res.data)
        console.log(res.data)
      }).catch(error => console.log(error))
    }
    getFrames()
  },[])


  return (
    <div className={styles.photoshootbackground}>
      <div className={styles.photoshootFont}>사진 촬영 완료!</div>
      <div className={styles.photoshootflex}>
        <PhotoShootLayout photoFrame={photoFrame} TotalUsers={TotalUsers} frames={frames}/>
        <PhotoShootDiary closeMenu={closeMenu} setPhotoFrame={setPhotoFrame} frames={frames}/>
      </div>
    </div>
  );
}

export default Photoshoot;
