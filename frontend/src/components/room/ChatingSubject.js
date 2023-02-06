import style from "./ChatingSubject.module.css";

function ChatingSubject({chattingSubject,sethidden,getSubject}) {
  const reload = () => {
    getSubject()
    sethidden(true)
  }

  return (
    <div className={style.background}>
      <div className={style.start}>이번의 잡담 주제는...</div>
      <div className={style.center}>"{chattingSubject}"</div>
      <button className={style.end} onClick={reload}>다시 뽑기</button>
    </div>
  );
}

export default ChatingSubject;
