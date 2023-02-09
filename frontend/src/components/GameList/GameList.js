import styles from "./GameList.module.css";
import { useLayoutEffect, useState } from "react";
import axios from "axios";
import GameRoomsDisplay from "./GameListDisplay";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCommentDots } from "react-icons/fa";
import { initUserData } from "../../app/userData";

export default function GameRoom({ searchWord }) {
  const user = useSelector((store) => store.userData);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginConfigure = () => {
    if (user.userNo === "") {
      return false;
    } else {
      return true;
    }
  };
  // axios로 게임 방 리스트를 받아오는 함수.
  const [gameRoomList, setGameRoomList] = useState([]);
  const [curGameRoomList, setCurGameRoomList] = useState([]);

  async function getList(Search) {
    if (loginConfigure()) {
      if (Search === null || "") {
        await axios({
          method: "GET",
          url: `${baseUrl}live`,
        })
          .then((res) => {
            console.log(" GameList res.data 가져온 결과", res.data);
            setGameRoomList(res.data);
            // Get currCards
            const indexOfLastCard = currentPage * cardsPerPage;
            const indexOfFirstCard = indexOfLastCard - cardsPerPage;

            const newGameRoomLIst = res.data.slice(
              indexOfFirstCard,
              indexOfLastCard
            );
            setCurGameRoomList(newGameRoomLIst);
            console.log("현재 페이지 게임 리스트", curGameRoomList);
          })
          .catch((error) => console.log(error));
      } else {
        await axios({
          method: "get",
          url: `${baseUrl}live`,
          params: { keyword: Search },
        })
          .then((res) => {
            setGameRoomList(res.data);
            // Get currCards
            const indexOfLastCard = currentPage * cardsPerPage;
            const indexOfFirstCard = indexOfLastCard - cardsPerPage;

            const newGameRoomLIst = gameRoomList.slice(
              indexOfFirstCard,
              indexOfLastCard
            );
            setCurGameRoomList(newGameRoomLIst);
          })
          .catch((error) => console.log(error));
      }
    } else {
      navigate("/live");
    }
  };

  useLayoutEffect(() => {
    // 방들 리스트를 로딩
    getList(searchWord);
  }, [currentPage, searchWord]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigateToCreateRoom = () => {
    if (loginConfigure) {
      alert("Please Login");
    } else {
      navigate("/makeroom");
    }
  };

  return (
    <div>
      {gameRoomList.length > 0 ? (
        <div>
          <GameRoomsDisplay gameRoomList={curGameRoomList} loading={loading} />
          <div>
            <Pagination
              className={styles.PaginationWhite}
              count={parseInt((gameRoomList.length - 1) / 10) + 1}
              page={currentPage}
              onChange={handleChange}
              color="secondary"
              size="large"
            />
          </div>
        </div>
      ) : (
        // 열려있는 게임방이 없는 경우
        <div className={styles.nodatacontainer}>
          <FaCommentDots className={styles.NoGameRoomsImg} />
          <p className={styles.NoGameRoomsText}>열려 있는 방이 없습니다 </p>
          <p className={styles.NoGameRoomsText}>
            방을 만들고 친구들을 불러보세요!
          </p>
          <button
            className={styles.CreateGameButton}
            onClick={navigateToCreateRoom}
          >
            방 만들기
          </button>
        </div>
      )}
    </div>
  );
}
