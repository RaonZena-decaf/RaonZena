import React, { useEffect, useRef, useState } from "react";
import style from "./NoneVideo.module.css";

function CameraComponent() {
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState();
  const tmp = useRef()
  const [columns, setColumns] = useState([]);

  async function startCamera(deviceId) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId,
      },
      audio: true,
    });

    console.log(stream)

    if (stream) {
      videoRef.current.srcObject = stream;
      tmp.current = stream;
    }
    console.log(tmp, videoRef.current)
  }

  function stopVideo() {
    if (tmp) {
      tmp.current.getTracks().forEach((track) => {
        if (track.readyState === "live") {
          track.stop();
        }
      });
    }
  }

  async function getDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cols = [];
    devices.forEach((device) => {
      if (device.kind === "videoinput") {
        startCamera(device.deviceId);
        cols.push({
          label: device.label,
          deviceId: device.deviceId,
        });
      }
    });

    setColumns(cols);
  }
  useEffect(() => {
    getDevices();
    return () => {stopVideo();}
    ;
  }, []);

  return (
    <div className={style.webcamCapture}>
      <video ref={videoRef} autoPlay></video>
    </div>
  );
}

export default CameraComponent;
