import React, { useEffect, useState } from "react";
import style from "./create.module.css";
import { useNavigate } from "react-router-dom";
function Create() {
  const navigate = useNavigate();
  const [roomname, setRoomname] = useState("");
  const [attend, setAttend] = useState(0);
  useEffect(() => {
    setRoomname("samplename");
    setAttend(3);
  }, [roomname, attend]);
  const enterOnClick = () => {
    navigate("/room/1");
  };
  const backOnClick = () => {
    navigate(-1)
  }

  return (
    <div className={style.container}>
      <div className={style.innercontainer}>
        <div className={style.leftcontainer}>
          <h2 className={style.header}>
            <span>{roomname}</span>에 참가 준비 중 입니다
          </h2>
          <div className={style.bottom}>
            <div className={style.textcont}>
              <icon></icon>현재 {attend}/6 명이 방에 있습니다
            </div>
            <div className={style.textcont}>
              카메라와 마이크 권한을 요청합니다. <br />
              요청 메세지를 확인하여 주세요.
            </div>
            <div className={style.textcont}>
              만약 오류가 발생하였을 경우, <br /> 홈 화면으로 이동 후 재접속
              하시기 바랍니다
            </div>
          </div>
          <button onClick={backOnClick}>나가기</button>
        </div>

        <div className={style.rightcontainer}>
          <div className={style.video}>화상</div>
          <div className={style.accessory}>
            <button>마이크</button>
            <button>카메라</button>
          </div>
          <button onClick={enterOnClick}>Enter</button>
        </div>
      </div>
    </div>
  );
}

export default Create;
