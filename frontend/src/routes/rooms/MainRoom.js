import styles from "./MainRoom.module.css";
import React, { useState, useEffect } from "react";
import MenuBar from "../../components/room/MenuBar";
import ChattingBar from "../../components/room/ChattingBar";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "../../components/camera/UserVideoComponent";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modifyUserData } from "../../app/userData";

import axios from "axios";
import Loading from "../../components/room/MainLoading";
import GameFrame from "../../components/GameRoom/GameFrame";

const OPENVIDU_SERVER_URL = "https://i8a507.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "RAONZENA";

function MainRoom(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { state } = useLocation();
  const user = useSelector((store) => store.userData);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [session, setSession] = useState(undefined);
  const [OV, setOV] = useState(undefined);
  const [subscribes, setSubscribes] = useState([]);
  const [userName, setUserName] = useState(user.userName);
  const [roomId, setroomId] = useState(params.roomId);
  const [publisher, setPublisher] = useState(undefined);
  const [openvidu, setOpenvidu] = useState(undefined);
  const [videoList, setVideoList] = useState(undefined);
  const [host, sestHost] = useState(state ? state.host : false);
  const [newGameScore, setNewGameScore] = useState([]);
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  //채팅바 토글을 위한 함수
  const [openChatting, setOpenChatting] = useState(false);
  const toggleBar = () => setOpenChatting(!openChatting);
  // 화면 랜더링 관련 함수
  const [gamename, setGameName] = useState("chatSubject");

  //메인메뉴 모달을 위한 함수
  const deleteSubscriber = (deletestream) => {
    setSubscribes((prev) =>
      prev.filter((stream) => stream.stream !== deletestream)
    );
  };

  const toggleDevice = async (mic, video) => {
    publisher.publishAudio(mic);
    publisher.publishVideo(video);
  };
  useEffect(() => {
    if (!state) {
      navigate(`/beforeroom/${params.roomId}`);
    }
    const OV = new OpenVidu();
    setOV(OV);
    // console 몇개 없애는 코드
    OV.enableProdMode();
    const after = new Promise((resolve, reject) => {
      const mySession = OV.initSession();
      setTimeout(() => {
        resolve(mySession);
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

              setPublisher(publisher);

              //현재 유저 점수를 받은 후, 자신의 점수를 0점으로 하여 저장
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

  useEffect(() => {
    axios({
      method: "Get",
      url: `${baseUrl}games/liveScore/${roomId}`,
    })
      .then((res) => {
        // res.data를 순회하면서 user=> [] 형태로 하나씩 push
        const gamseScores = [];
        res.data.userData.map((user) =>
          gamseScores.push([user.userNo, user.gameScore])
        );
        gamseScores.push([user.userNo, 0]);
        console.log(gamseScores);
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
      url: `${baseUrl}games/${params.roomId}/join`,
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
    return () => {
      if (host) {
        axios({
          method: "delete",
          url: `${baseUrl}live/${params.roomId}`,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log(error));
      }
    };
  }, []);

  // 세션 종료
  const leaveSession = async function () {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    if (session) {
      await session.disconnect();
    }

    const myscore = userList.filter((attend) => attend.userNo === user.userNo);

    axios({
      method: "PUT",
      url: `${baseUrl}profile/expToLevelModify`,
      data: { exp: myscore.gameScore, userNo: user.userNo },
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    const lev = parseInt(myscore.gameScore / 100);
    const leftExp = myscore.gameScore % 100;
    dispatch(
      modifyUserData({
        ...user,
        exp: user.exp + leftExp,
        level: user.level + lev,
      })
    );

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
              roomNo={params.roomId}
              newGameScore={newGameScore}
              setNewGameScore={setNewGameScore}
              userList={userList}
              setUserList={setUserList}
              mic={state.mic}
              toggleDevice={toggleDevice}
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
