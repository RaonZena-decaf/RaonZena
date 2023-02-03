import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./KakaoLogin.module.css";
import UnLockAnimation from "../../components/animaition/UnLock.js";
import { useSelector, useDispatch } from "react-redux";
import { modifyUserData } from "../../app/userData";

function KakaoLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = useSelector((store) => store.baseUrl);
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];

  const getToken = () => {
    axios({
      method: "POST",
      url: `${baseUrl}user/user/kakao/callback`,
      data: { code: KAKAO_CODE },
    })
      .then((res) => {
        setTimeout(() => {
          //redux 유저정보에 저장
          dispatch(modifyUserData(res.data));
          navigate("/live");
        }, 2000);
      })
      .catch((error) => {
        setTimeout(() => {
          alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
          navigate("/");
        }, 2000);
      });
  };

  useEffect(() => {
    if (!location.search) return;
    getToken();
  }, []);

  return (
    <div className={styles.container}>
      <UnLockAnimation />
      <div className={styles.title}>로그인 중입니다. 잠시만 기다려 주세요!</div>
    </div>
  );
}

export default KakaoLogin;
