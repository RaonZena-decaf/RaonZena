import { useSelector } from "react-redux";

export function Login() {
  const redirectUrl = useSelector((store) => store.redirectUrl)
  const REST_API_KEY = "507ec57801bf562750f3dea88a7c2b99";
  const REDIRECT_URI = `${redirectUrl}oauth/kakao/callback`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  if (typeof window !== "undefined") {
    window.location.href = KAKAO_AUTH_URL;
  }
}

