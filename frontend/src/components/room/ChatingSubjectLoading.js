import style from "./ChatingSubjectLoading.module.css";

function ChatingSubjectLoading() {
  return (
    <div className={style.background}>
      <img
        alt="로딩중"
        src="../img/Loading.png"
        className={style.logoImg}
      />
      <div className={style.fontsize}>주제를 고르고 있어요...</div>
    </div>
  );
}

export default ChatingSubjectLoading;
