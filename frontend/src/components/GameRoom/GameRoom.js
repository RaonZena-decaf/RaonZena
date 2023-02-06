import styles from "./GameRoom.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import GameRoomsDisplay from "./GameRoomsDisplay";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa";

export default function GameRoom({ searchWord }) {
  const user = useSelector((store) => store.userData);
  const baseUrl = useSelector((store) => store.baseUrl);
  const navigate = useNavigate();
  const loginConfigure = () => {
    if (user.user_no === "") {
      return false;
    } else {
      return true;
    }
  };
  // axios로 게임 방 리스트를 받아오는 함수.
  const [gameRoomList, setGameRoomList] = useState([]);
  const [curGameRoomList, setCurGameRoomList] = useState([]);

  const getList = (Search) => {
    if (Search === null || "") {
      axios({
        method: "GET",
        url: `${baseUrl}live`,
      })
        .then((res) => {
          setGameRoomList({...res.data});
          console.log(gameRoomList)
          // Get currCards
          const indexOfLastCard = currentPage * cardsPerPage;
          const indexOfFirstCard = indexOfLastCard - cardsPerPage;

          const newGameRoomLIst = gameRoomList.slice(
            indexOfFirstCard,
            indexOfLastCard
          );
          setCurGameRoomList(newGameRoomLIst);
          console.log(curGameRoomList);
        })
        .catch((error) => console.log(error));
    } else {
      axios({
        method: "get",
        url: `${baseUrl}live?keyword="${Search}"`,
        params: Search,
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
  };

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(() => {
    // 방들 리스트를 로딩
    getList(searchWord);
  }, [currentPage, searchWord]);

  // Change page
  const paginate = function (pageNumber) {
    setCurrentPage(pageNumber);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigateToCreateRoom = () => {
    if (loginConfigure) {
      navigate("/live");
    } else {
      alert("Please Login");
    }
  };

  return (
    <>
      {gameRoomList.length > 0 ? (
        <div>
          <div className={styles.GameRoomsDisplay}>
            <GameRoomsDisplay
              gameRoomList={curGameRoomList}
              loading={loading}
            />
          </div>
          <Pagination
            className={styles.PaginationWhite}
            count={parseInt((gameRoomList.length - 1) / 10) + 1}
            page={currentPage}
            onChange={handleChange}
            color="secondary"
            size="large"
          />
        </div>
      ) : (
        // 열려있는 게임방이 없는 경우
        <div>
          <FaCommentDots className={styles.NoGameRoomsImg} />
          <div className={styles.marginTopBot}>
            <p className={styles.NoGameRoomsText}>열려 있는 방이 없습니다 </p>
            <p className={styles.NoGameRoomsText}>
              방을 만들고 친구들을 불러보세요!
            </p>
          </div>

          <div className={styles.marginAuto}>
            <button
              className={styles.CreateGameButton}
              onClick={navigateToCreateRoom}
            >
              방 만들기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
