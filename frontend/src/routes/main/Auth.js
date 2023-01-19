// import { useEffect } from "react";
// import axios from "axios";
// import qs from "qs";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//   const REST_API_KEY = "507ec57801bf562750f3dea88a7c2b99";
//   const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
//   const CLIENT_SECRET = "ZVPBt6QSdLpRdLeOdL1iAqICcn1i8cvM";

//   const code = new URL(window.location.href).searchParams.get("code");

//   console.log("안녕???????? 난 코드야", code);

//   const navigate = useNavigate();

//   const getToken = async () => {
//     const payload = qs.stringify({
//       grant_type: "authorization_code",
//       client_id: REST_API_KEY,
//       redirect_uri: REDIRECT_URI,
//       code: code,
//       client_secret: CLIENT_SECRET,
//     });

//     try {
//       //access token 가져오기
//       const res = await axios.post(
//         "https://kauth.kakao.com/oauth/token",
//         payload
//       );

//       console.log("kakao token res", res);

//       //kakao Javascript SDK 초기화
//       window.Kakao.init(REST_API_KEY);

//       // access token 설정
//       window.Kakao.Auth.setAccessToken(res.data.access_token);
//       //history.replace("/profile");
//       navigate(-1);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   });


//   return null;
// };
// export default Auth;

import React, { useEffect } from "react";
import { useParams } from "react-router";

function KakaoLoginRedirect() {
  const params = useParams();

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("token", params.token);
    window.location.replace("/");
  });

  return <></>;
}

export default KakaoLoginRedirect;