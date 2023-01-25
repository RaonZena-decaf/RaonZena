import "./PhotoShoot.css";
import PhotoShootDiary from "./PhotoShootDiary";
import PhotoShootLayout from "./PhotoShootLayout";

function Photoshoot() {
  return (
    <div className="photoshootbackground">
      <div className="photoshootFont">사진이 촬영되었습니다.</div>
      <div className="photoshootflex">
        <PhotoShootLayout />
        <PhotoShootDiary />
      </div>
    </div>
  );
}

export default Photoshoot;
