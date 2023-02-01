import { experimentalStyled as styled } from "@mui/material/styles";
import styles from "./GameRoom.module.css";

//import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import GameRoomsDisplay from "./GameRoomsDisplay";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";

// const theme = createTheme({
//   palette: {
//     primary: blue,
//   },
// });

// const Pagination = styled(Paper)(({ theme }) => ({
//   // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#222222",
//   backgroundColor: "#222222",
//   boxShadow: "none",
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function GameRoom() {
  //const [gameRoomList, setGameRoomList] = useState([]);

  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [curGameRoomList, setCurGameRoomList] = useState([]);

  // useEffect(() => {
  //   const getMovieDetails = async () => {
  //     setLoading(true);
  //     const dataFromServer = await axios.get(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=e11085cff59023d052e3a69484d6cd19&page=${currentPage}`
  //     );
  //     const responeFromServer = dataFromServer.data.results;
  //     setGameRoomList(responeFromServer);
  //     setLoading(false);
  //   };

  //   getMovieDetails();
  // }, [currentPage]);

  useEffect(() => {
    // Get currCards
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;

    const newGameRoomLIst = gameRoomList.slice(
      indexOfFirstCard,
      indexOfLastCard
    );
    setCurGameRoomList(newGameRoomLIst);
  }, [currentPage]);

  // useEffect(() => {

  // , [newGameRoomLIst]
  // });

  // Change page
  const paginate = function (pageNumber) {
    setCurrentPage(pageNumber);
  };
  //console.log(cardsPerPage, gameRoomList.length, paginate);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const navigateToCreateRoom = () => {
    navigate("/Create");
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
