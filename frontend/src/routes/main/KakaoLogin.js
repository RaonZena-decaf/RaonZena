import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./KakaoLogin.module.css";
import UnLockAnimation from "../../components/animaition/UnLock.js";
import { useSelector, useDispatch } from "react-redux";
import { modifyUserData } from "../../app/userData";
import { modifyMyFollowingList } from "../../app/myFollowingList";

function KakaoLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = useSelector((store) => store.baseUrl);
  const followings = useSelector((store) => store.myFollowingList);
  const location = useLocation();
  const KAKAO_CODE = location.search.split("=")[1];

  async function getToken() {
    await axios({
      method: "POST",
      url: `${baseUrl}user/kakao/callback`,
      data:  KAKAO_CODE,
      headers: {'Content-type': 'application/json'}
    })
      .then((res) => {
        //redux 유저정보에 저장
        dispatch(modifyUserData(res.data));
        setTimeout(() => {
          navigate("/live");
        }, 1500);
      })
      .catch((error) => {
        console.log(error)
        setTimeout(() => {
          alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
          navigate("/");
        }, 1500);
      });
  };

  useEffect(() => {
    if (!location.search) return;
    getToken()
  }, []);

  return (
    <div className={styles.container}>
      <UnLockAnimation />
      <div className={styles.title}>로그인 중입니다. 잠시만 기다려 주세요!</div>
    </div>
  );
}

export default KakaoLogin;
