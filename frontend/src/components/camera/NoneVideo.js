import React, { useEffect, useRef, useState } from "react";
import style from "./NoneVideo.module.css";

function CameraComponent({ camera, mic }) {
  const videoRef = useRef(null);
  const [videoStream, setVideoStream] = useState();
  const tmp = useRef();
  const [columns, setColumns] = useState([]);

  async function startCamera(deviceId) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId,
      },
      audio: true,
    });

    console.log(stream);

    if (stream) {
      videoRef.current.srcObject = stream;
      tmp.current = stream;
    }
    console.log(tmp, videoRef.current);
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
    return () => {
      stopVideo();
    };
  }, []);

  useEffect(() => {
    console.log(camera);
    videoRef.current.muted = !mic;
    if (camera) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [mic, camera]);

  return (
    <div className={style.webcamCapture}>
      <video ref={videoRef} autoPlay muted={true} className={camera? null : style.grayscale}></video>
    </div>
  );
}

export default CameraComponent;
