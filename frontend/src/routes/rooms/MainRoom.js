import styles from "./MainRoom.module.css";
import React, { useState, useEffect } from "react";
import MenuBar from "../../components/room/MenuBar";
import ChattingBar from "../../components/room/ChattingBar";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../../components/camera/UserVideoComponent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import Loading from "../../components/room/MainLoading";
const OPENVIDU_SERVER_URL = "https://i8a507.p.ssafy.io";
const OPENVIDU_SERVER_SECRET = "RAONZENA";

function MainRoom() {
  const dispatch = useDispatch();
  const [session, setSession] = useState(undefined);
  const [subscribes, setSubscribes] = useState([]);
  const [userName, setUserName] = useState("User3");
  const [roomId, setroomId] = useState("Roomc");
  const [attend, setAttend] = useState(0);
  const [publisher, setPublisher] = useState(undefined);
  const [openvidu, setOpenvidu] = useState(undefined);
  //채팅바 토글을 위한 함수
  const [openChatting, setOpenChatting] = useState(false);
  const toggleBar = () => setOpenChatting(!openChatting);
  const navigate = useNavigate();

  //메인메뉴 모달을 위한 함수
  const deleteSubscriber = (streamManager) => {
    const index = subscribes.indexOf(streamManager, 0);
    if (index > -1) {
      setSubscribes((before) => {
        before.splice(index, 1);
      });
    }
  };

  useEffect(() => {
    const OV = new OpenVidu();

    const after = new Promise((resolve, reject) => {
      const mySession = OV.initSession();

      setTimeout(() => {
        resolve(mySession);
      }, 1000);
    });
    after
      .then((mySession) => {
        // --- 2) Init a session --
        setSession(mySession);
        console.log("session", mySession);
        // --- 3) Specify the actions when events take place in the session ---
        mySession.on("streamCreated", (event) => {
          const subscriber = mySession.subscribe(event.stream, undefined);
          setSubscribes((oldArray) => [...oldArray, subscriber]);
        });

        mySession.on("streamDestroyed", (event) => {
          deleteSubscriber(event.stream.streamManager);
        });

        mySession.on("exception", (exception) => {
          console.warn(exception);
          deleteSubscriber(exception.stream.streamManager);
        });

        const getToken = () => {
          return createSession(roomId).then((sessionId) =>
            createToken(sessionId)
          );
        };

        const createSession = (roomId) => {
          return new Promise((resolve, reject) => {
            let data = JSON.stringify({ customSessionId: roomId });
            axios
              .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, {
                headers: {
                  Authorization: `Basic ${btoa(
                    `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
                  )}`,
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                resolve(response.data.id);
              })
              .catch((response) => {
                let error = { ...response };
                if (error?.response?.status === 409) {
                  resolve(roomId);
                } else if (
                  window.confirm(
                    `No connection to OpenVidu Server. This may be a certificate error at "${OPENVIDU_SERVER_URL}"\n\nClick OK to navigate and accept it. ` +
                      `If no certificate warning is shown, then check that your OpenVidu Server is up and running at "${OPENVIDU_SERVER_URL}"`
                  )
                ) {
                  window.location.assign(
                    `${OPENVIDU_SERVER_URL}/accept-certificate`
                  );
                }
              });
          });
        };

        const createToken = (sessionId) => {
          return new Promise((resolve, reject) => {
            let data = {};
            axios
              .post(
                `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
                data,
                {
                  headers: {
                    Authorization: `Basic ${btoa(
                      `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
                    )}`,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                console.log('createdtoken', response.data.token)
                resolve(response.data.token);
              })
              .catch((error) => reject(error));
          });
        };
        // --- 4) Connect to the session with a valid user token ---
        getToken().then((token) => {
          console.log('token', token)
          mySession
            .connect(token, { clientData: userName })
            .then(
              async () => {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // 끝

  const onbeforeunload = (event) => {
    leaveSession();
  };
  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);

    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);
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
    navigate("/live");
  };
  useEffect(() => {
    setOpenvidu({ session, publisher, userName });
  }, [session, publisher, userName]);
  return (
    <div className={styles.background}>
      {session !== undefined ? (
        <div>
          <div className={styles.GameRoomsDisplay}>
            {/* <div className={styles.card}>
              <UserVideoComponent streamManager={publisher} />
            </div> */}
            {subscribes.map((sub, i) => (
              <div key={i} className={styles.card}>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>

          <MenuBar toggleBar={toggleBar} exitaction={leaveSession} />
          <ChattingBar
            openChatting={openChatting}
            toggleBar={toggleBar}
            openvidu={openvidu}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default MainRoom;
