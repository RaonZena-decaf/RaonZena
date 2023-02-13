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
      data: KAKAO_CODE,
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        //redux 유저정보에 저장
        dispatch(modifyUserData(res.data));
        //로그인 이후 자신이 팔로우하고 있는 사람들의 정보를 가져옴
        axios({
          method: "get",
          url: `${baseUrl}profile/${res.data.userNo}/following`,
        })
          .then((res) => {
            const array = [];
            res.data.map((follwings) => array.push(follwings.userNo));
            dispatch(modifyMyFollowingList(array));
          })
          .catch((error) => console.log(error));

        setTimeout(() => {
          navigate("/live");
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
          navigate("/");
        }, 1500);
      });
  }

  useEffect(() => {
    if (!location.search) return;
    getToken();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <span>C</span>
        <span>o</span>
        <span>n</span>
        <span>n</span>
        <span>e</span>
        <span>c</span>
        <span>t</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
      <div className={styles.bar}></div>
    </div>
  );
}

export default KakaoLogin;
