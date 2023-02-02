import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import Item from "./HostFollowingsItem";
import styles from "./Followings.module.css";
import { useSelector } from "react-redux";

const HostFollowings = ({ HostFollowingsList, loading }) => {
  const [List, setList] = useState([]);
  const baseUrl = useSelector((store)=>store.baseUrl)
  const nowUserNo = useSelector((store)=>store.userData.user_no)

  const getlist = () => {
    axios({
      method:"get",
      url :`${baseUrl}live/followingRoom`,
      data : {user_no : nowUserNo}
    }).then((res)=>{
      setList(res.data.content)
    }).catch(error =>
      console.log(error))
  }
  useEffect(()=>{
    getlist()
  },[])

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (List.length > 0) {
    return (
      <div className={styles.HostFollowingsList}>
        {List?.map((gameRoomInfo, idx) => {
          return (
            <Item
              key={idx}
              userName={gameRoomInfo.host.user_name}
              userImage={gameRoomInfo.host.user_image_url}
              level={gameRoomInfo.host.level}
              roomTitle={gameRoomInfo.room_title}
              headcount={gameRoomInfo.headcount}
              password={gameRoomInfo.password}
              // 자동으로 이미지 뽑기 (redux)
              // roomImage={gameRoomInfo.room_image}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <div className={styles.nothingImg1}>
          <img className={styles.nothingImg2} src="./nothing.svg" alt="" />
        </div>
        <div className={styles.marginTopBot}>
          <p className={styles.NoGameRoomsText}>
            지금 놀고 있는 친구가 없습니다.
          </p>
        </div>
      </div>
    );
  }
};

export default HostFollowings;
