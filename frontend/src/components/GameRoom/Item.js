import React, { useState, useNavigate } from "react";
import styles from "./GameRoom.module.css";

const Item = (props) => {
  return (
    <div className="card">
      <div className="card-container">
        <div className="image-container">
          <img src={props.src} alt="" />
        </div>
        <div className="card-content">
          <div className="title-container">
            <h3>{props.title}</h3>
          </div>
          <div className="body-container">
            <p>{props.users}</p>
          </div>
        </div>
        <div className="btn">
          <button>
            <a href="#">입장</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Item);

// return (
//   <div className={styles.BackGround}>
//     <img className={styles.RoomImage} alt="룸 이미지" src={props.src} />
//     <div className={styles.RoomTitle}>{props.title}</div>
//     <div className={styles.UserCount}> {props.users} / 6</div>
//   </div>
// );
