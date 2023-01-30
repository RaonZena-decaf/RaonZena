import React, { useEffect } from "react";
import lottie from "lottie-web";
import animationData from "./unlock.json"
import { height } from "@mui/system";

const UnLockAnimation = () => {
  const container = document.querySelector("#unLockAnimation")

  useEffect(() => {
    lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData
    })
  }, [])
  return (
    <>
      <div id="unLockAnimation" style={{width:"30rem", height:"30rem"}}></div>
    </>
  )
}

export default UnLockAnimation