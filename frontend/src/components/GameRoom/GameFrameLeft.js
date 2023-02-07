import React, { useEffect, useState } from "react";
import styles from "./GameFrameLeft.module.css";
import CharacterQuiz from "../game/CharacterQuiz";
import GameFrameProgress from "./GameFrameProgress";
import Catchmind from "../game/catchmind";
import ShoutInSilence from "../game/ShoutInSilence";

function GameFrameLeft({ start, result, gamename, setResult, openvidu }) {
  const [peopleList, setPeopleList] = useState([
    { user: "임길현", points: 90, img: "../profile/profileimg.png" },
    { user: "김찬빈", points: 80, img: "../profile/profileimg.png" },
    { user: "최지연", points: 70, img: "../profile/profileimg.png" },
    { user: "윤수희", points: 60, img: "../profile/profileimg.png" },
    { user: "김민소", points: 50, img: "../profile/profileimg.png" },
    { user: "홍영민", points: 40, img: "../profile/profileimg.png" },
  ]);

  //   useEffect(() => {
  //     //현재 방에 있는 사람들 리스트 불러오는 redis
  //     //그 리스트를 peoplelist에 할당
  //     //const peoplelist = 받아온리스트
  //   }, [peopleList]);

  peopleList.sort(function (a, b) {
    return b.points - a.points;
  });
  return (
    <div>
      <div>
        <div className={styles.container}>
          {gamename === "imagegame" && (
            <CharacterQuiz start={start} result={result} />
          )}
          {gamename === "seeking" && (
            <CharacterQuiz start={start} result={result} />
          )}
          {gamename === "catchmind" && (
            <Catchmind start={start} result={result} />
          )}
          {gamename === "talkingsilence" && (
            <ShoutInSilence start={start} result={result} />
          )}
          {gamename === "peoplequiz" && (
            <CharacterQuiz
              start={start}
              result={result}
              setResult={setResult}
              openvidu={openvidu}
            />
          )}
          {gamename === "joker" && (
            <CharacterQuiz start={start} result={result} />
          )}
        </div>
        <div className={styles.progressframe}>
          <div>
            {peopleList.slice(0, 3).map((people, idx) => {
              return (
                <div key={idx} className={styles.score}>
                  <div className={styles.score2}>
                    <img alt="img" src={people.img} className={styles.img} />
                    <span className={styles.font2}>{people.user}</span>
                  </div>
                  <GameFrameProgress people={people} />
                </div>
              );
            })}
          </div>
          <div>
            {peopleList.slice(3, 6).map((people, idx) => {
              return (
                <div key={idx} className={styles.score}>
                  <div className={styles.score2}>
                    <img alt="img" src={people.img} className={styles.img} />
                    <span className={styles.font2}>{people.user}</span>
                  </div>
                  <GameFrameProgress people={people} />
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
