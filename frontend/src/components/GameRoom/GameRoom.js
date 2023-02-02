import { experimentalStyled as styled } from "@mui/material/styles";
import styles from "./GameRoom.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import GameRoomsDisplay from "./GameRoomsDisplay";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";


export default function GameRoom({searchWord}) {
  
  const navigate = useNavigate();

  // axios로 게임 방 리스트를 받아오는 함수.
  // const [gameRoomList, setGameRoomList] = useState()
  // const getList = (Search) =>{
  //   if (Search === null ){
  //     axios({
  //       method:"get",
  //       url : "http://localhost:8080/api/v1/live"})
  //       .then((res) => {
  //       setGameRoomList(res.content)
  //     }).catch(error =>
  //       console.log(error))
  //   } else {
  //     axios({
  //       method:"get",
  //       url : `http://localhost:8080/api/v1/live?keyword="${Search}"`})
  //       .then((res)=> {
  //         setGameRoomList(res.content)
  //       }).catch(error =>
  //       console.log(error))
  //   }
  // }

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [curGameRoomList, setCurGameRoomList] = useState([]);
  
  // 임시 데이터
  const gameRoomList = [
    { title: "title152", users: 3, image_src: "./Room1.png" },
    { title: "어서와", users: 6, image_src: "./Room2.png" },
    { title: "title3", users: 1, image_src: "./Room3.png" },
    { title: "title4", users: 0, image_src: "./Room4.png" },
    { title: "title5", users: 1, image_src: "./Room5.png" },
    { title: "title6", users: 1, image_src: "./Room6.png" },
    { title: "title7", users: 3, image_src: "./Room7.png" },
    { title: "title8", users: 0, image_src: "./Room8.png" },
    { title: "title9", users: 1, image_src: "./Room9.png" },
    { title: "title10", users: 6, image_src: "./Room10.png" },
    { title: "title11", users: 6, image_src: "./Room11.png" },
    { title: "title12", users: 5, image_src: "./Room12.png" },
  ];

  useEffect(() => {
    // 방들 리스트를 로딩
    // getList(searchWord)

    // Get currCards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    const newGameRoomLIst = gameRoomList.slice(
      indexOfFirstCard,
      indexOfLastCard
    );
    setCurGameRoomList(newGameRoomLIst);
  }, [currentPage]);

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
