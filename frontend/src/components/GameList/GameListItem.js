import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./GameList.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaUser } from "react-icons/fa";


const Item = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(0);
  const baseUrl = useSelector((store) => store.baseUrl);

  const navigateToGameRoom = () => {
    navigate(`/beforeroom/${props.roomNo}`, {
      state: {
        roomNo: props.roomNo,
        headcount: props.headcount,
        roomTitle: props.title,
        users: users,
        password: props.password
      },
    });
  };
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseUrl}games/${props.roomNo}/join`,
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <div className={styles.card}>
      <img
        className={styles.imageSize}
        src={props.image_src}
        alt=""
        onClick={navigateToGameRoom}
      />
      <p className={styles.RoomTitle} onClick={navigateToGameRoom}>
        {props.title}
      </p>
      <p className={styles.UserCount}>
        <FaUser/> {users} / {props.headcount}
      </p>
    </div>
  );
};

export default React.memo(Item);
