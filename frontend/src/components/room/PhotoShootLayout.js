import "./PhotoShootLayout.css";

function PhotoShootLayout() {
  return (
    <div className="photoshootlayoutgradient">
      <div className="photoshootlayoutmaintextcontainer">
        <div className="photoshootlayoutbox"></div>
        <div className="photoshootlayoutbox"></div>
        <div className="photoshootlayoutbox"></div>
      </div>

      <div className="photoshootlayoutmaintextcontainer">
        <div className="photoshootlayoutbox2"></div>
        <div className="photoshootlayoutbox2"></div>
        <div className="photoshootlayoutbox2"></div>
      </div>

      <div className="photoshootlayoutLogo">
        <img alt="로고" src="./PhotoShootLogo.png" />
        <span className="photoshootlayoutfont">RaonZena</span>
      </div>
    </div>
  );
}

export default PhotoShootLayout;
