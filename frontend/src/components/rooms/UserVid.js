import React from "react";
import styles from "./UserVid.module.css"

function UserVid() {
  return (
    <div className={styles.MaxHeight}>
      영상이 나올 곳
    </div>
  );
}

export default React.memo(UserVid);
