import React, { useEffect, useRef } from "react";
import style from "./SampleVideo.module.css";

function SampleVideo() {
  let videoRef = useRef(null);

  //사용자 웹캠에 접근

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        //비디오 tag에 stream 추가
        let video = videoRef.current;

        video.srcObject = stream;

        var playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then((_) => {}).catch((error) => {});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  return (
    <div className={style.webcamCapture}>
      <video ref={videoRef}></video>
      <span className={style.username}>임길현</span>
    </div>
  );
}

export default SampleVideo;
