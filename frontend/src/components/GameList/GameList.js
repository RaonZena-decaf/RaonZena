import styles from "./GameList.module.css";
import { useLayoutEffect, useState, useEffect } from "react";
import axios from "axios";
import GameListDisplay from "./GameListDisplay";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCommentDots } from "react-icons/fa";

export default function GameList({ searchWord }) {
  const user = useSelector((store) => store.userData);
  const baseUrl = useSelector((store) => store.baseUrl);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

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

  const getList = async (Search) =>  {
    if (Search === null || "") {
      await axios({
        method: "GET",
        url: `${baseUrl}live`,
      })
        .then((res) => {
          setGameRoomList(res.data);
          // Get currCards
          const newGameRoomLIst = res.data.slice(
            indexOfFirstCard,
            indexOfLastCard
          );
          setCurGameRoomList(newGameRoomLIst);
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
          const newGameRoomLIst = res.data.slice(
            indexOfFirstCard,
            indexOfLastCard
          );
          setCurGameRoomList(newGameRoomLIst);
        })
        .catch((error) => console.log(error));
    }
  }
  useEffect(() => {
    getList(searchWord)
  },[])
  useLayoutEffect(() => {
    // 방들 리스트를 로딩
    getList(searchWord);
  }, [currentPage, searchWord]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigateToCreateRoom = () => {
    if (loginConfigure() === true) {
      navigate("/makeroom");
    } else {
      alert("Please Login");
    }
  };

  return (
    <div>
      {gameRoomList.length > 0 ? (
        <div>
          <GameListDisplay gameRoomList={curGameRoomList} loading={loading} />
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
