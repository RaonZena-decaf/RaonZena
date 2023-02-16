import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./HostFollowingGamesItem";
import styles from "./HostFollowingGames.module.css";
import { useSelector } from "react-redux";
import { FaUserTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HostFollowingGames = ({ HostFollowingsList, loading }) => {
  const [list, setList] = useState([]);
  const baseUrl = useSelector((store) => store.baseUrl);
  const nowUserNo = useSelector((store) => store.userData.userNo);

  async function getlist() {
    if (nowUserNo !== "") {
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
  }, []);

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

export default HostFollowingGames;
