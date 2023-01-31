import React, { useEffect, useRef } from 'react'
import style from './NoneVideo.module.css'

function CameraComponent(){

  let videoRef = useRef(null)

  //사용자 웹캠에 접근

  const getUserCamera = () =>{
    navigator.mediaDevices.getUserMedia({
      video:true
    })
    .then((stream) => {
      //비디오 tag에 stream 추가
      let video = videoRef.current

      video.srcObject = stream

      var playPromise = video.play()
      if (playPromise !== undefined) { playPromise.then((_) => {}).catch((error) => {}); }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getUserCamera()
  },[videoRef])

  return(
      <video className={style.webcamCapture} width="70%" height="70%" ref={videoRef}></video>
  )
}

export default CameraComponent;