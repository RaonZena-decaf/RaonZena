import style from "./ChatingSubjectLoding.module.css";

function chat() {
  return (
    <div className={style.background}>
      <img
        alt="로딩중"
        src="./ChatingSubjectLoding.png"
        className={style.logoImg}
      />
      <div className={style.fontsize}>주제를 고르고 있어요...</div>
    </div>
  );
}

export default chat;
