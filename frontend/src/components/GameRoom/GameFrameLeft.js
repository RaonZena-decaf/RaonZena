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

function GameFrameLeft({ start,
  result,
  gamename,
  setResult,
  openvidu,
  host,
  roomNo,
}) {
  const baseUrl = useSelector((store) => store.baseUrl);
  const [userList, setUserList] = useState([{
    "userNo": 1,
    "userId": "123456",
    "userName": "홍영민",
    "exp": 0,
    "level": 1,
    "userImage": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg"
},
{
    "userNo": 2,
    "userId": "123456",
    "userName": "윤수희",
    "exp": 0,
    "level": 1,
    "userImage": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg"
},
{
    "userNo": 3,
    "userId": "123456",
    "userName": "최지연",
    "exp": 0,
    "level": 1,
    "userImage": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg"
    },
    {
      "userNo": 2,
      "userId": "123456",
      "userName": "윤수희",
      "exp": 0,
      "level": 1,
      "userImage": "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg"
  },

  ]);

  //현재 방에 있는 사람들 리스트 불러오는 redis

  // const getUserList = () => {
  //   axios({
  //     method: "get",
  //     url: `${baseUrl}games/${roomNo}`,
  //   })
  //     .then((res) => {
  //       console.log("게임 프레임 Left 참여자 정보 출력 =>", res.data);
  //       setUserList(res.data);
  //     })
  //     .catch((error) =>
  //       console.log("게임 프레임 Left 참여자 정보 출력 에러 =>", error)
  //     );
  // };

  // useEffect(() => {
  //   getUserList();
  // }, []);

  // useEffect(() => {
  //   getUserList();
  // }, [openvidu.subscribe]);
  
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
            {userList.slice(0, 3).map((user, idx) => {
              return (
                <div key={idx} className={styles.score}>
                  <div className={styles.score2}>
                    <img alt="img" src={user.userImage} className={styles.img} />
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
                    <img alt="img" src={user.userImage} className={styles.img} />
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
