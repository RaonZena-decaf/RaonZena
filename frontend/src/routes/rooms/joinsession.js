import React, { useEffect, useState } from "react";
import style from "./beforeenter.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/navbar/navbar";
import VideoContainer from "../../components/camera/NoneVideo";
import {
  FaVideo,
  FaVideoSlash,
  FaMicrophoneAltSlash,
  FaMicrophoneAlt,
  FaUser,
} from "react-icons/fa";
import { OpenVidu } from "openvidu-browser";

import axios from "axios";
const APPLICATION_SERVER_URL = "http://localhost:5000/";

function BeforeEnter(props) {
  const [session, setSession] = useState(undefined);
  const [subscribes, setSubscribes] = useState([]);
  const [userName, setUserName] = useState("User");
  const [roomId, setroomId] = useState("RoomB");
  const [attend, setAttend] = useState(0);
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const navigate = useNavigate();

  // 방에 접근 시 axios 통신이나 정보를 받아와서 방 정보 갱신 하는 부분

  // join session
  // --- 1) Get an OpenVidu object ---
  const joinSession = () => {
    const OV = new OpenVidu();

    setSession(() => {
      // --- 2) Init a session ---
      const mySession = OV.initSession();

      // --- 3) Specify the actions when events take place in the session ---
      mySession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        const beforesubscriber = subscribes.push(subscriber);
        setSubscribes(beforesubscriber);
      });

      mySession.on("streamDestroyed", (event) => {
        this.deleteSubscriber(event.stream.streamManager);
      });

      mySession.on("exception", (exception) => {
        console.warn(exception);
      });

      // --- 4) Connect to the session with a valid user token ---
      getToken().then((token) => {
        mySession
          .connect(token, { clientData: userName })
          .then(async () => {
            // --- 5) Get your own camera stream ---
            const publisher = await OV.initPublisherAsync(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---
            mySession.publish(publisher);

            // Obtain the current video device in use
            const devices = await OV.getDevices();
            const videoDevices = devices.filter(
              (device) => device.kind === "videoinput"
            );
            const currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            const currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            );

            // Set the main video in the page to display our webcam and store our Publisher
            // this.setState({
            //   currentVideoDevice: currentVideoDevice,
            //   mainStreamManager: publisher,
            //   publisher: publisher,
            // });
          })
          .catch((error) => {
            console.log(
              "There was an error connecting to the session:",
              error.code,
              error.message
            );
          });
      });
      return mySession;
    });
  }

    const getToken = async () => {
      const newtoken = await createSession(roomId);
      return await createToken(newtoken);
    };
    const createSession = async function (newtoken) {
      const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions",
        { customSessionId: newtoken },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data; // The sessionId
    };
    const createToken = async function (newtoken) {
      const response = await axios.post(
        APPLICATION_SERVER_URL + "api/sessions/" + newtoken + "/connections",
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data; // The token
    };
  // 끝
  // 이전 페이지로 돌아가기
  const backOnClick = () => {
    navigate(-1);
  };
  // 마이크와 카메라 정보 갱신 부분

  useEffect(() => {
    // 어디서 화상 상태와 이와 관련된 default값을 가져오는가?
  });
  const micOnClick = () => {
    setMic((prev) => {
      return !prev;
    });
  };
  const cameraOnClick = () => {
    setCamera((prev) => {
      return !prev;
    });
  };
  return (
    <div className={style.background}>
      <Navbar />
      <div className={style.container}>
        <div className={style.innercontainer}>
          <div className={style.leftcontainer}>
            <h2 className={style.header}>
              <span>{roomId}</span>에 참가 준비 중 입니다
            </h2>
            <div className={style.bottom}>
              <div className={style.textcont}>
                <FaUser className={style.highlight} /> 현재 {userName}
                /6 명이 방에 있습니다
              </div>
              <div className={style.textcont}>
                카메라와 마이크 권한을 요청합니다. <br />
                요청 메세지를 확인하여 주세요.
              </div>
              <div className={style.textcont}>
                만약 오류가 발생하였을 경우, <br /> 홈 화면으로 이동 후 재접속
                하시기 바랍니다
              </div>
            </div>
            <button onClick={backOnClick}>나가기</button>
          </div>

          <div className={style.rightcontainer}>
            <VideoContainer />
            <div className={style.accessory}>
              {mic ? (
                <FaMicrophoneAlt onClick={micOnClick} />
              ) : (
                <FaMicrophoneAltSlash onClick={micOnClick} />
              )}

              {camera ? (
                <FaVideo onClick={cameraOnClick} />
              ) : (
                <FaVideoSlash onClick={cameraOnClick} />
              )}
            </div>
            <button className={style.enter} onClick={joinSession}>Enter</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BeforeEnter;
