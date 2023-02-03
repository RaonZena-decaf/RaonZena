import { experimentalStyled as styled } from "@mui/material/styles";
import styles from "./GameRoom.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import GameRoomsDisplay from "./GameRoomsDisplay";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";
import { useSelector } from "react-redux";

export default function GameRoom({searchWord}) {

  const baseUrl = useSelector((store)=> store.baseUrl)
  const navigate = useNavigate();

  // axios로 게임 방 리스트를 받아오는 함수.
  const [gameRoomList, setGameRoomList] = useState([])
  const getList = (Search) =>{
    if (Search === null ){
      axios({
        method:"get",
        url : `${baseUrl}live`})
        .then((res) => {  
        setGameRoomList(res.data)
      }).catch(error =>
        console.log(error))
    } else {
      axios({
        method:"get",
        url : `${baseUrl}live?keyword="${Search}"`,
        params : {keyword : Search},
        }).then((res)=> {
          console.log(res)
          setGameRoomList(res.data)
        }).catch(error =>
        console.log(error))
    }
  }

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [curGameRoomList, setCurGameRoomList] = useState([]);

  useEffect(() => {
    // 방들 리스트를 로딩
    console.log(searchWord)
    getList(searchWord)
    console.log(gameRoomList)
    // Get currCards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    const newGameRoomLIst = gameRoomList.slice(
      indexOfFirstCard,
      indexOfLastCard
    );
    setCurGameRoomList(newGameRoomLIst);
  }, [currentPage, searchWord]);

  // Change page
  const paginate = function (pageNumber) {
    setCurrentPage(pageNumber);
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigateToCreateRoom = () => {
    navigate("/room/makeroom");
  };


  if (curGameRoomList.length > 0) {
    return (
      <div>
        <div className={styles.GameRoomsDisplay}>
          <GameRoomsDisplay gameRoomList={curGameRoomList} loading={loading} />
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
    );
  }

  // 열려있는 게임방이 없는 경우
  else {
    return (
      <div>
        <div className={styles.NoGameRoomsImg}>
          <img src="./talk.svg" alt="" />
        </div>
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
    );
  }
}
