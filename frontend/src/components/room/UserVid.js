import React from "react";
import styles from "./UserVid.module.css"

function UserVid() {
  return (
    <div className={styles.Height}>
      영상이 나올 곳
    </div>
  );
}

export default React.memo(UserVid);
