import { useLayoutEffect } from "react";
import html2canvas from "html2canvas";
import styles from "./PhotoShootLayout.module.css";

function PhotoShootLayout({ photoFrame, TotalUsers }) {
  useLayoutEffect(() => {
    for (const user of TotalUsers) {
      html2canvas(document.getElementById(`${user.videos[0].id}`)).then(
        (canvas) => {
          // 이미지 url을 얻는다
          const dataUrl = canvas.toDataURL("image/png");
          //css 텍스트로 입력
          const facePhoto = document.getElementById(`사진${user.videos[0].id}`);
          facePhoto.style.cssText = `background-image : url('${dataUrl}')`;
        }
      );
    }
  }, []);

  return (
    <div className={styles.photoFrame} id="사진촬영완료">
      <img
        className={styles.photoFrameImg}
        alt="프레임"
        src={`url(${photoFrame})`}
        crossOrigin="anonymous"
      ></img>
      <div className={styles.photoshootlayoutmaintextcontainer}>
        {TotalUsers.map((user) => {
          return (
            <div
              id={`사진${user.videos[0].id}`}
              className={styles.photoshootlayoutbox}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default PhotoShootLayout;
