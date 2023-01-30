import style from "./ChatingSubjectLoading.module.css";
import { FaCircleNotch } from "react-icons/fa";


function ChatingSubjectLoading() {
  return (
    <div className={style.background}>
      <FaCircleNotch className={style.logoImg}/>
      <div className={style.fontsize}>주제를 고르고 있어요...</div>
    </div>
  );
}

export default ChatingSubjectLoading;
