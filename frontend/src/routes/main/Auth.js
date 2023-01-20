import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function KakaoLoginRedirect() {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("token", true);
    navigate("/");
  });

  return <></>;
}

export default KakaoLoginRedirect;
