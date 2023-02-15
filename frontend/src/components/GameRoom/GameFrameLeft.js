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
  setEnd,
  setStart,
  subscribes,
  newGameScore,
  setNewGameScore,
  // userList,
  setUserList,
  mic,
  toggleDevice,
}) {
  console.log("GameFrameLeft의 subscribes => ", subscribes);
  const baseUrl = useSelector((store) => store.baseUrl);

  const axiosScore = () => {
    axios({
      method: "GET",
      url: `${baseUrl}games/liveScore/${roomNo}`,
    })
      .then((res) => {
        console.log("으아아아아아아아아아아아아아아아악");
        console.log(res.data); // Add code to execute here
        setUserList(res.data.userData);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    axiosScore();
  }, []);

  const SendScore = () => {
    setNewGameScore(
      userList.map((user) => ({
        userNo: user.userNo,
        gameScore: user.gameScore,
      }))
    );
    console.log(newGameScore);
    axios({
      method: "POST",
      url: `${baseUrl}games/liveScore/`,
      data: { roomNo: roomNo, userData: newGameScore },
    })
      .then((res) => {
        console.log("dkdkdkdkd");
        console.log(res.data);
        userList.sort(function (a, b) {
          return b.points - a.points;
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      if (data.gamename === "joker" && data.clicked === "1") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return { ...user, gameScore: 100 };
            } else {
              return user;
            }
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === "2") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              if (user.gameScore + 5 >= 100) {
                return { ...user, gameScore: 100 };
              } else {
                return { ...user, gameScore: user.gameScore + 5 };
              }
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === "3") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              if (user.gameScore + 10 >= 100) {
                return { ...user, gameScore: 100 };
              } else {
                return { ...user, gameScore: user.gameScore + 10 };
              }
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === "4") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              if (user.gameScore - 5 <= 0) {
                return { ...user, gameScore: 0 };
              } else {
                return { ...user, gameScore: user.gameScore - 5 };
              }
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === "5") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              if (user.gameScore - 10 <= 0) {
                return { ...user, gameScore: 0 };
              } else {
                return { ...user, gameScore: user.gameScore - 10 };
              }
            }

            return user;
          })
        );
      }
      if (data.gamename !== "joker") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              if (user.gameScore + data.score <= 0) {
                return { ...user, gameScore: 0 };
              } else if (user.gameScore + data.score >= 100) {
                return { ...user, gameScore: 100 };
              } else {
                return { ...user, gameScore: user.gameScore + data.score };
              }
            }
            return user;
          })
        );
      }
      SendScore();
    });
  }, []);

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
              host={host}
              setEnd={setEnd}
              setStart={setStart}
            />
          )}

          {gamename === "objectfast" && (
            <Seeking
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              setEnd={setEnd}
              setStart={setStart}
            />
          )}
          {gamename === "catchmind" && (
            <Catchmind
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              setStart={setStart}
            />
          )}
          {gamename === "talkingsilence" && (
            <ShoutInSilence
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              subscribes={subscribes}
              mic={mic}
              toggleDevice={toggleDevice}
              setEnd={setEnd}
              setStart={setStart}
            />
          )}
          {gamename === "personquiz" && (
            <CharacterQuiz
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
              host={host}
              setEnd={setEnd}
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
        <div className={styles.background}>
          <div className={styles.progressframe}>
              {/* {console.log("업데이트 하기 후 유저 리스트!!!", userList[4])} */}
              {userList.map((user, idx) => {
                return (
                  <div key={idx} className={styles.score}>
                    <div className={styles.score2Left}>
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
