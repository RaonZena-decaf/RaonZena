import { useEffect } from "react";
import "./PhotoShootLayout.css";

function PhotoShootLayout({photoFrame}) {
  const userlist = [
    { user_name: "김찬빈"},
    { user_name: "윤수희"},
    { user_name: "홍영민"},
    { user_name: "임길현"},
    { user_name: "최지연"},
    { user_name: "김민소"},
  ];
  // 참가 유저 수에 따른 배치 변경
  // 화면 사이즈 조절은 더 고려해볼 것.

  return (
    <div
      className="photoFrame"
      id="사진촬영완료"
      style={{
        backgroundImage: `url("../img/PhotoFrame/frame${photoFrame}.jpg")`,
      }}
    >
      <div className="photoshootlayoutmaintextcontainer">
        { userlist.map((user) => {
            return (<div key={user.user_name} className="photoshootlayoutbox"></div>)
          })
        }
      </div>
    </div>
  );
}

export default PhotoShootLayout;
