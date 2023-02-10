import style from "./ChatingSubjectLoading.module.css";
import { FaCircleNotch } from "react-icons/fa";
import ChatingSubject from "./ChatingSubject";
import { useEffect, useState } from "react";

function ChatingSubjectLoading({chattingSubject, getSubject}) {
  const [hidden, sethidden] = useState(true)

  useEffect(() => {
    if (hidden===true) {
    setTimeout(() => {
      sethidden(false);
    },500)}
  }, [hidden]);

  return (
    <>
    {hidden === true && <div className={style.background}>
      <FaCircleNotch className={style.logoImg}/>
      <div className={style.fontsize}>주제를 고르고 있어요...</div>
    </div>}
    {hidden === false && <ChatingSubject chattingSubject={chattingSubject} sethidden={sethidden} getSubject={getSubject}/>}
    </>
  );
}

export default ChatingSubjectLoading;
