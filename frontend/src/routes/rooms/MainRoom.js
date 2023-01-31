import styles from "./MainRoom.module.css";
import React, { useState, useEffect } from "react";
import MenuBar from "../../components/room/MenuBar";
import ChattingBar from "../../components/room/ChattingBar";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../../components/camera/UserVideoComponent";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Navigate } from "react-router-dom";
const APPLICATION_SERVER_URL = "http://localhost:5000/";

function MainRoom() {
  const [session, setSession] = useState(undefined);
  const [subscribes, setSubscribes] = useState([]);
  const [userName, setUserName] = useState("User3");
  const [roomId, setroomId] = useState("Roomc");
  const [attend, setAttend] = useState(0);
  const [publisher, setPublisher] = useState(undefined);
  //채팅바 토글을 위한 함수
  const [openChatting, setOpenChatting] = useState(false);
  const toggleBar = () => setOpenChatting(!openChatting);
  const navigate = useNavigate();


  //메인메뉴 모달을 위한 함수
  useEffect(() => {
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
            setPublisher(publisher);
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
  }, []);
  // 끝
  // 세션 종료
  const leaveSession = async function () {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      await session.disconnect();
    }

    // Empty all properties...
     setSession(undefined);
     setSubscribes([]);
     setroomId("None");
    setUserName("User");
    navigate("/live")
  };

  return (
    <div className={styles.background}>
      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{roomId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>
          <UserVideoComponent streamManager={publisher} />

          {subscribes.map((sub, i) => (
            <div
              key={i}
              className="stream-container col-md-6 col-xs-6"
              onClick={() => this.handleMainVideoStream(sub)}
            >
              <UserVideoComponent streamManager={sub} />
            </div>
          ))}
        </div>
      ) : null}
      <MenuBar toggleBar={toggleBar} />
      <ChattingBar openChatting={openChatting} toggleBar={toggleBar} />
    </div>
  );
}

export default MainRoom;
