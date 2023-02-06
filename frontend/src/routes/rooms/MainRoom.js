import styles from "./MainRoom.module.css";
import React, { useState, useEffect, useRef } from "react";
import MenuBar from "../../components/room/MenuBar";
import ChattingBar from "../../components/room/ChattingBar";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../../components/camera/UserVideoComponent";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import Loading from "../../components/room/MainLoading";
import Catchmind from "../../components/game/catchmind";
const OPENVIDU_SERVER_URL = "https://i8a507.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "RAONZENA";

function MainRoom(props) {
  const dispatch = useDispatch();
  const [session, setSession] = useState(undefined);
  const [OV, setOV] = useState(undefined);
  const [subscribes, setSubscribes] = useState([]);
  const [userName, setUserName] = useState(`User ${getRandomInt(1, 100)}`);
  const [roomId, setroomId] = useState("Roomc");
  const [publisher, setPublisher] = useState(undefined);
  const [openvidu, setOpenvidu] = useState(undefined);
  const [videoList, setVideoList] = useState(undefined);
  //채팅바 토글을 위한 함수
  const [openChatting, setOpenChatting] = useState(false);
  const toggleBar = () => setOpenChatting(!openChatting);
  const navigate = useNavigate();
  // 화면 랜더링 관련 함수
  const [gamename, setGameName] = useState("default");

  //메인메뉴 모달을 위한 함수
  const deleteSubscriber = (streamManager) => {
    setSubscribes((prev) =>
      prev.filter((stream) => stream.streamManager !== streamManager)
    );
  };
  // 임시 사용자 이름 랜덤으로 부여
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }
  const toggleDevice = async () => {
    console.log("Toggle device");
    // try {
    //   let devices = await OV.getDevices()
    //   let videoDevices = devices.filter(device => device.kind === 'videoinput')

    //   let newPublisher = openvidu.OV.initPublisher(undefined, {
    //     audioSource: undefined, // The source of audio. If undefined default microphone
    //     videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
    //     publishAudio: mic, // Whether you want to start publishing with your audio unmuted or not
    //     publishVideo: video, // Whether you want to start publishing with your video enabled or not
    //     resolution: '640x480', // The resolution of your video
    //     frameRate: 30, // The frame rate of your video
    //     insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
    //     mirror: false, // Whether to mirror your local video
    //   })

    //   await openvidu.session.unpublish(openvidu.mainStreamManager)

    //   await openvidu.session.publish(newPublisher)
    //   setPublisher(newPublisher)

    // } catch (error) {
    //   console.log(error)
    // }
  };
  useEffect(() => {
    const OV = new OpenVidu();
    setOV(OV);
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
        // MainRoom 에서 발생해야 하는 signal들 정리
        mySession.on("streamCreated", (event) => {
          const subscriber = mySession.subscribe(event.stream, undefined);
          setSubscribes((oldArray) => [...oldArray, subscriber]);
          console.log("new enterance", subscribes);
        });

        mySession.on("streamDestroyed", (event) => {
          console.log("manager", event.stream.streamManager);
          deleteSubscriber(event.stream.streamManager);
        });

        mySession.on("exception", (exception) => {
          console.warn(exception);
          // 어떤 이유인지 왜 비디오가 없는 유저에 대해서 예외처리가 되질 않습니다. 추가적인 확인 이후에 해야함
        });
        mySession.on("signal:gameChange", (event) => {
          console.log(event.data);
          setGameName(event.data.gamename);
        });

        // 토큰 발행 및 소켓 접속
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
                console.log("createdtoken", response.data.token);
                resolve(response.data.token);
              })
              .catch((error) => reject(error));
          });
        };
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
                streamId: userName, // 다른 것들과 구분하기 위한 변수값
              });

              // --- 6) Publish your stream ---
              mySession.publish(publisher);
              // Obtain the current video device in use
              // const devices = await OV.getDevices();
              // const videoDevices = devices.filter(
              //   (device) => device.kind === "videoinput"
              // );
              // const currentVideoDeviceId = publisher.stream
              //   .getMediaStream()
              //   .getVideoTracks()[0]
              //   .getSettings().deviceId;
              // const currentVideoDevice = videoDevices.find(
              //   (device) => device.deviceId === currentVideoDeviceId
              // );

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
    console.log(publisher);
    setVideoList({ ...subscribes, publisher });
    setOpenvidu({ session, videoList, userName });
  }, [session, publisher, userName, subscribes]);
  // 신호에 따른 화면 렌더링 변화
  const ChangeGame = (gamename) => {
    const data = {
      gamename: gamename,
    };
    setGameName(gamename);
    openvidu.session.signal({
      data: JSON.stringify(data),
      type: "gameChange",
    });
  };

  return (
    <div className={styles.background}>
      {session !== undefined ? (
        <div>
          <div className={styles.GameRoomsDisplay}>
            <div className={styles.card}>
              <UserVideoComponent streamManager={publisher} />
            </div>
            {subscribes.map((sub, i) => (
              <div key={i} className={styles.card}>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>

          <MenuBar
            toggleBar={toggleBar}
            exitaction={leaveSession}
            camera={props.camera}
            mic={props.mic}
            toggleDevice={toggleDevice}
            ChangeGame={ChangeGame}
          />
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
