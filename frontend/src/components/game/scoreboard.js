import React from "react";
import SingleScore from "../game/singleScore";
import style from "../game/scoreboard.module.css";

function ScoreBoard() {
  const userList = [
    { name: "User1", score: 90 },
    { name: "User2", score: 75 },
    { name: "User3", score: 60 },
    { name: "User4", score: 50 },
    { name: "User5", score: 30 },
    { name: "User6", score: 10 },
  ];

  return (
    <div className={style.board}>
      {userList.map((userInfo) => {
        return (
          <SingleScore
            key={userInfo.name}
            name={userInfo.name}
            score={userInfo.score}
          />
        );
      })}
    </div>
  );
}

export default ScoreBoard;
