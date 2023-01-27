import "./PhotoShoot.css";
import PhotoShootDiary from "./PhotoShootDiary";
import PhotoShootLayout from "./PhotoShootLayout";

function Photoshoot() {
  return (
    <div className="photoshootbackground">
      <div className="photoshootFont">사진 촬영 완료!</div>
      <div className="photoshootflex">
        <PhotoShootLayout />
        <PhotoShootDiary />
      </div>
    </div>
  );
}

export default Photoshoot;
