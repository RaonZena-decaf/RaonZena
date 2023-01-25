import style from "./ChatingSubject.module.css";

function ChatingSubject() {
  return (
    <div className={style.background}>
      <div className={style.start}>이번의 잡담 주제는...</div>
      <div className={style.center}>"MBTI"</div>
      <button className={style.end}>다른 주제</button>
    </div>
  );
}

export default ChatingSubject;
