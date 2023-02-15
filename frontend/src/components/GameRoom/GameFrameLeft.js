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
  publisher,
  setStart,
  gameScore,
  setGameScore,
  userList,
  setUserList,
}) {
  const baseUrl = useSelector((store) => store.baseUrl);


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

  useEffect(()=>{
    setGameScore(userList.map(user => [user.userNo, user.gameScore]));

    axios({
      method: "POST",
      url: `${baseUrl}games/liveScore/`,
      data: { roomNo: roomNo, userData: gameScore },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  },[userList]);

  useEffect(() => {
    openvidu.session.on("signal:TrueAnswer", (event) => {
      const data = JSON.parse(event.data);
      console.log(data.userNo);
      if (data.gamename === "joker" && data.clicked === 1) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return { ...user, exp: user.exp + (100 - user.exp) };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 2) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp + 5 >= 100 ? 100 : user.exp + 5,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 3) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp + 10 >= 100 ? 100 : user.exp + 10,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 4) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp - 5 <= 0 ? 0 : user.exp - 5,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename === "joker" && data.clicked === 5) {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              return {
                ...user,
                exp: user.exp - 10 <= 0 ? 0 : user.exp - 10,
              };
            }
            return user;
          })
        );
      }
      if (data.gamename !== "joker") {
        setUserList((prev) =>
          prev.map((user) => {
            if (user.userNo === data.userNo) {
              if (user.exp + data.score <= 0) {
                return { ...user, exp: 0 };
              } else if (user.exp + data.score >= 100) {
                return { ...user, exp: 100 };
              } else {
                return { ...user, exp: user.exp + data.score };
              }
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
              publisher = {publisher}
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
