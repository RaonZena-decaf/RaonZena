import React, { useEffect, useRef, useState } from "react";
import style from "./NoneVideo.module.css";

function CameraComponent({ camera, mic }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.log("Error accessing camera:", error);
      });
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Cleanup resources
  useEffect(() => {
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [stream]);

  useEffect(() => {
    videoRef.current.muted = !mic;
    if (camera) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [mic, camera]);

  return (
    <div className={style.webcamCapture}>
      <video
        ref={videoRef}
        autoPlay
        muted={true}
        className={camera ? null : style.grayscale}
      ></video>
    </div>
  );
}

export default CameraComponent;
