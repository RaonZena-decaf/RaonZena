import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import Item from "./HostFollowingsItem";
import styles from "./Followings.module.css";

const HostFollowings = ({ HostFollowingsList, loading }) => {
  const List = [
    {
      roomNo: 1,
      roomTitle: "안녕하세요!!",
      headcount: 6,
      password: "123456",
      createDate: "2023-02-25T19:33:11.6965021",
      currentCount: 5,
      roomImage: "./Room11.png",
      host: {
        userNo: 1,
        userId: "1234567",
        userName: "귀염둥이영민쮸",
        exp: 30,
        level: 1,
        createDate: 1674178030000,
        //userImage: "http://k.kakaocdn.net~~~~~.jpg",
        userImage: "./NoImageProfile.svg",
      },
    },
    {
      roomNo: 1,
      roomTitle: "안녕하세요!!",
      headcount: 6,
      password: "123456",
      createDate: "2023-02-25T19:33:11.6965021",
      currentCount: 5,
      roomImage: "./Room11.png",
      host: {
        userNo: 1,
        userId: "1234567",
        userName: "귀염둥이영민쮸",
        exp: 30,
        level: 1,
        createDate: 1674178030000,
        //userImage: "http://k.kakaocdn.net~~~~~.jpg",
        userImage: "./NoImageProfile.svg",
      },
    },
    {
      roomNo: 2,
      roomTitle: "SSAFY 노래방",
      headcount: 4,
      password: "123",
      createDate: "2023-02-25T17:33:11.6965021",
      currentCount: 1,
      roomImage: "./Room12.png",
      host: {
        userNo: 1,
        userId: "1234567",
        userName: "김우빈보단김찬빈",
        exp: 30,
        level: 11,
        createDate: 1674178030000,
        // userImage: "http://k.kakaocdn.net~~~~~.jpg",
        userImage: "./NoImageProfile.svg",
      },
    },
    {
      roomNo: 3,
      roomTitle: "고민상담해드려요",
      headcount: 4,
      password: "0000",
      createDate: "2023-02-25T17:33:11.6965021",
      currentCount: 1,
      roomImage: "./Room10.png",
      host: {
        userNo: 1,
        userId: "1234567",
        userName: "악성코드윤수히123213213",
        exp: 30,
        level: 11,
        createDate: 1674178030000,
        // userImage: "http://k.kakaocdn.net~~~~~.jpg",
        userImage: "./NoImageProfile.svg",
      },
    },
    {
      roomNo: 4,
      roomTitle: "고124민상1담해드려요124122",
      headcount: 4,
      password: "0000",
      createDate: "2023-02-25T17:33:11.6965021",
      currentCount: 1,
      roomImage: "./Room9.png",
      host: {
        userNo: 1,
        userId: "1234567",
        userName: "악성코드",
        exp: 30,
        level: 11,
        createDate: 1674178030000,
        // userImage: "http://k.kakaocdn.net~~~~~.jpg",
        userImage: "./NoImageProfile.svg",
      },
    },
  ];
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.HostFollowingsList}>
      {List?.map((gameRoomInfo, idx) => {
        return (
          <Item
            key={idx}
            userName={gameRoomInfo.host.userName}
            userImage={gameRoomInfo.host.userImage}
            level={gameRoomInfo.host.level}
            roomTitle={gameRoomInfo.roomTitle}
            headcount={gameRoomInfo.headcount}
            password={gameRoomInfo.password}
            currentCount={gameRoomInfo.currentCount}
            roomImage={gameRoomInfo.roomImage}
          />
        );
      })}
    </div>
  );
};

export default HostFollowings;
