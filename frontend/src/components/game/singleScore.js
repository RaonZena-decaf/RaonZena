import React from "react";
import style from "../game/singleScore.module.css";
import { FaRegUserCircle } from "react-icons/fa";

function ScoreBoard(props) {
  return (
    <div className={style.board}>
      <FaRegUserCircle className={style.icon} />
      <div>{props.name}</div>
      <progress id="progress" value={props.score} min="0" max="100"></progress>{" "}
    </div>
  );
}

export default ScoreBoard;
