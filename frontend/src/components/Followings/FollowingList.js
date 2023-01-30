import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import Item from "./Item";
import styles from "./Followings.module.css";

export default function FollowingList() {
  const list = [
    {
      userNo: 1,
      userName: "귀염둥이영민쮸",
      level: 1,
      userImage: "./NoImageProfile.svg",
      isOnline: true,
    },
    {
      userNo: 2,
      userName: "김우빈보단김찬빈",
      level: 11,
      userImage: "./NoImageProfile.svg",
      isOnline: true,
    },
    {
      userNo: 3,
      userName: "우유빛깔임길연",
      level: 66,
      userImage: "./NoImageProfile.svg",
      isOnline: false,
    },
    {
      userNo: 4,
      userName: "입덧사탕최지현",
      level: 10,
      userImage: "./NoImageProfile.svg",
      isOnline: false,
    },
    {
      userNo: 5,
      userName: "악성코드윤수히",
      level: 40,
      userImage: "./NoImageProfile.svg",
      isOnline: true,
    },
  ];

  return (
    <div className={styles.FollowingList}>
      {list?.map((followInfo) => {
        return (
          <Item
            userNo={followInfo.userNo}
            userName={followInfo.userName}
            level={followInfo.level}
            userImage={followInfo.userImage}
            isOnline={followInfo.isOnline}
          />
        );
      })}
    </div>
  );
}
