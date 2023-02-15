import styles from "./MainRoom.module.css";
import React, { useState, useEffect } from "react";
import MenuBar from "../../components/room/MenuBar";
import ChattingBar from "../../components/room/ChattingBar";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../../components/camera/UserVideoComponent";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import Loading from "../../components/room/MainLoading";
import GameFrame from "../../components/GameRoom/GameFrame";

const OPENVIDU_SERVER_URL = "https://i8a507.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "RAONZENA";

function MainRoom(props) {
  const { state } = useLocation();
  const user = useSelector((store) => store.userData);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [session, setSession] = useState(undefined);
  const [OV, setOV] = useState(undefined);
  const [subscribes, setSubscribes] = useState([]);
  const [userName, setUserName] = useState(user.userName);
  const [roomId, setroomId] = useState(state.roomNo.toString());
  const [publisher, setPublisher] = useState(undefined);
  const [openvidu, setOpenvidu] = useState(undefined);
  const [videoList, setVideoList] = useState(undefined);
  const [host, sestHost] = useState(state.host);
  const [gameScore, setGameScore] = useState([]);
  const [userList, setUserList] = useState([]);
  //채팅바 토글을 위한 함수
  const [openChatting, setOpenChatting] = useState(false);
  const toggleBar = () => setOpenChatting(!openChatting);
  const navigate = useNavigate();
  // 화면 랜더링 관련 함수
  const [gamename, setGameName] = useState("chatSubject");

  //메인메뉴 모달을 위한 함수
  const deleteSubscriber = (deletestream) => {
    setSubscribes((prev) =>
      prev.filter((stream) => stream.stream !== deletestream)
    );
  };
  // // 임시 사용자 이름 랜덤으로 부여
  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  // }
  const toggleDevice = async (mic, video) => {
    publisher.publishAudio(mic);
    publisher.publishVideo(video);
  };
  useEffect(() => {
    const OV = new OpenVidu();
    setOV(OV);
    // console 몇개 없애는 코드
    // OV.enableProdMode()
    const after = new Promise((resolve, reject) => {
      const mySession = OV.initSession();
      setTimeout(() => {
        resolve(mySession);
        // setUserName(user.userName);
      }, 1000);
    });
    after
      .then((mySession) => {
        console.log(mySession);
        // --- 3) Specify the actions when events take place in the session ---
        // MainRoom 에서 발생해야 하는 signal들 정리
        mySession.on("streamCreated", (event) => {
          const subscriber = mySession.subscribe(event.stream, undefined);
          setSubscribes((oldArray) => [...oldArray, subscriber]);
        });

        mySession.on("streamDestroyed", (event) => {
          deleteSubscriber(event.stream);
        });

        mySession.on("exception", (exception) => {
          deleteSubscriber(exception.origin.stream);
          console.warn(exception);
        });
        mySession.on("signal:gameChange", (event) => {
          const data = JSON.parse(event.data);
          setGameName(data.gamename);
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
                console.log(response);
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
                resolve(response.data.token);
              })
              .catch((error) => reject(error));
          });
        };
        // --- 4) Connect to the session with a valid user token ---
        getToken().then((token) => {
          mySession
            .connect(token, { clientData: userName, host: host })
            .then(async () => {
              // --- 5) Get your own camera stream ---
              setSession(mySession);
              const publisher = await OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: state.mic, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: state.camera, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
                streamId: userName, // 다른 것들과 구분하기 위한 변수값
                host: state.host,
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

              //현재 유저 점수를 받은 후, 자신의 점수를 0점으로 하여 저장
              axios({
                method: "Get",
                url: `${baseUrl}games/liveScore/${roomId}`,
              })
                .then((res) => {
                  const gamseScores = res.data.userData.slice();
                  gamseScores.push([user.userNo, 0]);
                  axios({
                    method: "post",
                    url: `${baseUrl}games/liveScore`,
                    data: { roomNo: roomId, userData: gamseScores },
                  })
                    .then((res) => {
                      console.log(res.data);
                    })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));
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
  const [headcount, setHeadCount] = useState(0);
  useEffect(() => {
    console.log("길이", subscribes.length);
    const data = {
      headCount: subscribes.length + 1,
    };
    axios({
      method: "put",
      url: `${baseUrl}games/${state.roomNo}/join`,
      data: data,
    })
      .then((res) => {
        console.log("된건가?", res);
        setHeadCount(subscribes.length);
      })
      .catch((error) => console.log(error));
  }, [subscribes]);

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    console.log("길이", subscribes.length);
    return () => {
      console.log("길이2", subscribes.length);
      axios({
        method: "get",
        url: `${baseUrl}games/${state.roomNo}/join`,
      })
        .then((res) => {
          if (res.data === 1) {
            axios({
              method: "delete",
              url: `${baseUrl}live/${state.roomNo}`,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => console.log(error));
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  // 세션 종료
  const leaveSession = async function () {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      await session.disconnect();
    }

    axios({
      method: "post",
      url: `${baseUrl}profile/expToLevelModify`,
      data: { exp: gameScore, userNo: user.userNo },
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    // Empty all properties...
    setSession(undefined);
    setroomId("None");
    setUserName("User");
    navigate("/live");
  };

  useEffect(() => {
    setVideoList({ ...subscribes, publisher });
    setOpenvidu({
      session,
      videoList,
      userName,
      publisher,
      userNo: user.userNo,
    });
  }, [session, publisher, userName, subscribes]);
  // 신호에 따른 화면 렌더링 변화
  const ChangeGame = (event) => {
    const data = {
      gamename: event.target.id,
    };
    openvidu.session.signal({
      data: JSON.stringify(data),
      type: "gameChange",
    });
  };

  //현재 유저 리스트
  const TotalUsers = [...subscribes, publisher];

  const card = () => {
    if (subscribes.length === 0) {
      return "card1";
    } else if (subscribes.length === 1) {
      return "card2";
    } else if (subscribes.length <= 3) {
      return "card3";
    } else if (4 <= subscribes.length) {
      return "card4";
    }
  };

  return (
    <div className={styles.background}>
      {publisher !== undefined ? (
        <div className={styles.background2}>
          {gamename === "chatSubject" && (
            <div className={styles.GameRoomsDisplay}>
              <div className={styles[card()]}>
                <UserVideoComponent streamManager={publisher} />
              </div>
              {subscribes.map((sub, i) => (
                <div key={i} className={styles[card()]}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          )}
          {gamename !== "chatSubject" && (
            <GameFrame
              gamename={gamename}
              openvidu={openvidu}
              host={host}
              publisher={publisher}
              subscribes={subscribes}
              roomNo={state.roomNo}
              gameScore={gameScore}
              setGameScore={setGameScore}
              userList={userList}
              setUserList={setUserList}
            />
          )}
          <MenuBar
            toggleBar={toggleBar}
            exitaction={leaveSession}
            camera={state.camera}
            mic={state.mic}
            toggleDevice={toggleDevice}
            ChangeGame={ChangeGame}
            TotalUsers={TotalUsers}
            host={host}
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
