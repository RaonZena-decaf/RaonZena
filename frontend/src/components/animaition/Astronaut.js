import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./Astronaut.json"

const AstronautAnimation = () => {
  const unlockContainer = useRef()

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: unlockContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData
    });
    return () => instance.destroy()
  })
  return (
      <div ref={unlockContainer} style={{width:"60rem", height:"20rem"}}></div>
  )
}

export default AstronautAnimation