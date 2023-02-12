import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div id={styles.footer}>
      <div id={styles.footertitle}>Connect Us, Connect Times, At RaonZena</div>
      <div id={styles.footercontent}>
        <p>Decaffeine Inc. 서울시 강남구 역삼 2동 멀티캠퍼스</p>
        <p>대표 홍영민 사업자등록번호 XXX-XX-XXXX</p>
        <p>Copyright ⓒ Decaffeine Inc. All Right Reserved.</p>
      </div>
    </div>
  );
}

export default React.memo(Footer);
