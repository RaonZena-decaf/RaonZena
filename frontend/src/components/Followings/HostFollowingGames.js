import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./HostFollowingGamesItem";
import styles from "./HostFollowingGames.module.css";
import { useSelector } from "react-redux";
import { FaUserTimes } from "react-icons/fa";

const HostFollowings = ({ HostFollowingsList, loading }) => {
  const [list, setList] = useState([]);
  const baseUrl = useSelector((store) => store.baseUrl);
  const nowUserNo = useSelector((store) => store.userData.user_no);

  const getlist = () => {
    if (nowUserNo) {
      axios({
        method: "get",
        url: `${baseUrl}live/followingRoom`,
        data: { userNo: nowUserNo },
      })
        .then((res) => {
          console.log("HostFollowings res.data 가져온 결과", res.data);
          setList(res.data);
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    getlist();
    console.log("Hostfollowings 컴포넌트 getList 결과", list);
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // --------------------스웨거에서 확인한 데이터-------------------
  // 유저 이름    userName={gameRoomInfo.host.userName}
  // 유저 이미지  userImage={gameRoomInfo.host.userImageUrl}
  // 유저 레벨    level={gameRoomInfo.host.level}
  // 방 이름      roomTitle={gameRoomInfo.roomTitle}
  // 최대 인원 수 headcount={gameRoomInfo.headcount}
  // 비밀번호     password={gameRoomInfo.password}
  // 방 썸네일    roomImage={gameRoomInfo.imageName}

  if (list.length > 0) {
    return (
      <div className={styles.HostFollowingsList}>
        {list?.map((gameRoomInfo, idx) => {
          return (
            <Item
              key={idx}
              userName={gameRoomInfo.host.userName}
              userImage={gameRoomInfo.host.userImageUrl}
              level={gameRoomInfo.host.level}
              roomTitle={gameRoomInfo.roomTitle}
              headcount={gameRoomInfo.headcount}
              password={gameRoomInfo.password}
              roomImage={gameRoomInfo.imageName}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className={styles.marginTopBot}>
        <FaUserTimes className={styles.NoGameRoomsImg} />
        <p className={styles.NoGameRoomsText}>
          지금 놀고 있는 친구가 없습니다.
        </p>
      </div>
    );
  }
};

export default HostFollowings;
