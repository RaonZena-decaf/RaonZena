import styles from "./ShowResult.module.css";

export default function ShowResult(isWrong) {

  if (isWrong) {
    return (
      <textarea
        type="button"
        disabled
        true
        id="wrongAlert"
        //   className={styles.DisableTrue}
        // className={styles.DisableTrue}
        className={isWrong ? styles.DisableTrue : styles.DisableFalse}
      >
        {/* {isWrong ? "틀렸습니다" : "???"} */}
        틀렸습니다
      </textarea>
    );
  } else {
    return <div></div>;
  }
}
