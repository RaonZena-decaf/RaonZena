import "./PhotoShootLayout.css";

function PhotoShootLayout({photoFrame}) {
  // 드롭다운 value값을 가져와서 FrameNum을 바꿔서 적용하기 (아마 위 컴포넌트로 변수 올려줘야 할듯.)

  return (
    <div
      className="photoFrame"
      style={{
        backgroundImage: `url("../img/PhotoFrame/test${photoFrame}.jpg")`,
      }}
    >
      <div className="photoshootlayoutmaintextcontainer">
        <div className="photoshootlayoutbox"></div>
        <div className="photoshootlayoutbox"></div>
        <div className="photoshootlayoutbox"></div>
        <div className="photoshootlayoutbox"></div>
        <div className="photoshootlayoutbox"></div>
        <div className="photoshootlayoutbox"></div>
      </div>
    </div>
  );
}

export default PhotoShootLayout;
