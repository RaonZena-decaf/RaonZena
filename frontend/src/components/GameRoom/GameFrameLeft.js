import React, { useEffect, useState } from "react";
import styles from "./GameFrameLeft.module.css";
import CharacterQuiz from "../game/CharacterQuiz";
import Lotte from "../game/Lotto";
import GameFrameProgress from "./GameFrameProgress";
import Catchmind from "../game/catchmind";
import ShoutInSilence from "../game/ShoutInSilence";
import Seeking from "../game/Seeking";
import axios from "axios";
import { useSelector } from "react-redux";

function GameFrameLeft({
  start,
  result,
  gamename,
  setResult,
  openvidu,
  host,
  roomNo,
}) {
  const baseUrl = useSelector((store) => store.baseUrl);
  const [userList, setUserList] = useState([
    {
      userNo: 1,
      userId: "123456",
      userName: "홍영민",
      exp: 50,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 2,
      userId: "123456",
      userName: "윤수희",
      exp: 40,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 3,
      userId: "123456",
      userName: "최지연",
      exp: 30,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 4,
      userId: "123456",
      userName: "윤수희",
      exp: 20,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
    {
      userNo: 7,
      userId: "2657509460",
      userName: "임길현",
      exp: 0,
      level: 1,
      userImage:
        "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    },
  ]);
  useEffect(() => {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      console.log(data.userNo);
      if (data.gamename === "joker" && data.clicked >= 1 && data.clicked <= 8) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return { ...user, exp: user.exp + 5 };
            }
            return user;
          })
        );
      }
    });
  }, []);

  userList.sort(function (a, b) {
    return b.points - a.points;
  });
  return (
    <div className={styles.leftcontainer}>
      <div>
        <div className={styles.container}>
          {gamename === "imagetheme" && (
            <Seeking
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
            />
          )}

          {gamename === "objectfast" && (
            <Seeking
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
            />
          )}
          {gamename === "catchmind" && (
            <Catchmind
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
            />
          )}
          {gamename === "talkingsilence" && (
            <ShoutInSilence
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              userList={userList}
            />
          )}
          {gamename === "personquiz" && (
            <CharacterQuiz
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
            />
          )}
          {gamename === "joker" && (
            <Lotte
              start={start}
              result={result}
              openvidu={openvidu}
              host={host}
            />
          )}
        </div>
        <div className={styles.progressframe}>
          <div>
            {console.log("업데이트 하기 후 유저 리스트!!!", userList[4])}
            {userList.slice(0, 3).map((user, idx) => {
              return (
                <div key={idx} className={styles.score}>
                  <div className={styles.score2}>
                    <img
                      alt="img"
                      src={user.userImage}
                      className={styles.img}
                    />
                    <span className={styles.font2}>{user.userName}</span>
                  </div>
                  <GameFrameProgress user={user} />
                </div>
              );
            })}
          </div>
          <div>
            {userList.slice(3, 6).map((user, idx) => {
              return (
                <div key={idx} className={styles.score}>
                  <div className={styles.score2}>
                    <img
                      alt="img"
                      src={user.userImage}
                      className={styles.img}
                    />
                    <span className={styles.font2}>{user.userName}</span>
                  </div>
                  <GameFrameProgress user={user} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameFrameLeft;
