import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./HostFollowingGamesItem";
import styles from "./HostFollowingGames.module.css";
import { useSelector } from "react-redux";
import { FaUserTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HostFollowings = ({ HostFollowingsList, loading }) => {
  const [list, setList] = useState([]);
  const baseUrl = useSelector((store) => store.baseUrl);
  const nowUserNo = useSelector((store) => store.userData.userNo);
  
  async function getlist() {
    if (nowUserNo) {
      await axios({
        method: "get",
        url: `${baseUrl}live/followingRoom`,
      })
        .then((res) => {
          setList(res.data);
          if (res.data.length > 0) {
            const scrollChange = document.querySelector("#scrollChange");
            scrollChange.addEventListener(
              "wheel",
              (event) => {
                event.preventDefault();
                if (event.deltaY > 0) {
                  scrollChange.scrollBy({
                    left: 420,
                    behavior: "smooth",
                  });
                } else {
                  scrollChange.scrollBy({
                    left: -420,
                    behavior: "smooth",
                  });
                }
              },
              { passive: false }
            );
          }
        })
        .catch((error) => console.log(error));
    }
  }
  useEffect(() => {
    getlist();
    // 가로 스크롤링 이벤트
    console.log("Hostfollowings 컴포넌트 getList 결과", list);
  }, []);
  
  // --------------------스웨거에서 확인한 데이터------------------

  // "roomNo": 1040,
  //   "roomTitle": "dd",
  //   "host": {
  //     "userNo": 1,
  //     "userId": "sdf",
  //     "userName": "adf",
  //     "exp": 0,
  //     "level": 1,
  //     "createDtm": 1675759213000,
  //     "userImageUrl": "adf"
  //   },
  //   "headcount": 5,
  //   "password": 48,
  //   "createDate": null,
  //   "imageName": "/GameThumbnail/24.png"
  

  return (
    <div className={styles.HostFollowingsList} id="scrollChange">
      {list.length > 0 ? (
        <>
          {list?.map((gameRoomInfo, idx) => {
            return (
              <Item
                key={idx}
                roomNo={gameRoomInfo.roomNo}
                roomTitle={gameRoomInfo.roomTitle}
                host={gameRoomInfo.host}
                headcount={gameRoomInfo.headcount}
                password={gameRoomInfo.password}
                createDate={gameRoomInfo.createDate}
                imageName={gameRoomInfo.imageName}
              />
            );
          })}
        </>
      ) : (
        <div className={styles.NoGameRooms}>
          <FaUserTimes className={styles.NoGameRoomsImg} />
          <p className={styles.NoGameRoomsText}>
            지금 놀고 있는 친구가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default HostFollowings;
