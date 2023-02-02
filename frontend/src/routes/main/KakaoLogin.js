import axios from "axios"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./KakaoLogin.module.css"
import UnLockAnimation from "../../components/animaition/UnLock.js"
import { useSelector, useDispatch } from "react-redux"
import { modifyUserData } from "../../app/userData"

function KakaoLogin () {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const baseUrl = useSelector((store)=>store.baseUrl)
  const location = useLocation()
  const KAKAO_CODE = location.search.split('=')[1]


  const getToken = () => {
    const sendData = JSON.stringify({
      KAKAO_CODE
    })
    axios({
      method: "GET",
      url: `${baseUrl}user/user/kakao/callback`,
      data: sendData,
      headers: {'Content-type': 'application/json'}
    }).then((res)=>{
      //redux 유저정보에 저장
      dispatch(modifyUserData(res.data))
      navigate("/live")
    }).catch(error=>{
      alert("로그인에 실패하였습니다. 다시 시도해 주세요.")
      navigate("/")
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