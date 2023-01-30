import axios from "axios"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./KakaoLogin.module.css"
import UnLockAnimation from "../../components/animaition/UnLock.js"

function KakaoLogin () {
  const navigate = useNavigate();
  const location = useLocation()
  const KAKAO_CODE = location.search.split('=')[1]
  const getToken = () => {
    const sendData = JSON.stringify({
      KAKAO_CODE
    })
    axios({
      method: "POST",
      url: 'http://localhost:8080/api/v1/user/user/kakao/callback',
      data: sendData,
      headers: {'Content-type': 'application/json'}
    }).then((res)=>{
      //redux에 저장
      alert("로그인 성공!")
      navigate("/live")
    }).catch(error=>{
      alert("로그인에 실패하였습니다. 다시 시도해 주세요.")
      // navigate("/")
    })
  }

  useEffect(() => {
    if (!location.search) return
    getToken()
  }, [])

  return (
  <div className={styles.container}>
    <UnLockAnimation/>
    <div className={styles.title}>
      로그인 중입니다. 잠시만 기다려 주세요!
    </div>
  </div>)
}

export default KakaoLogin