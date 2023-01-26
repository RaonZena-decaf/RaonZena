import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "./Item";
import styles from "./GameRoom.module.css";

import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CardsDisplay from "./CardsDisplay";
import { Pagination } from "@mui/material";

export default function GridGameRoom() {
  const [loading, setLoading] = useState(false);

  const [gameRoomList, setGameRoomList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      const dataFromServer = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e11085cff59023d052e3a69484d6cd19&page=${currentPage}`
      );
      const responeFromServer = dataFromServer.data.results;
      setGameRoomList(responeFromServer);
      setLoading(false);
    };

    getMovieDetails();
  }, [currentPage]);

  // Get currCards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = gameRoomList.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log(cardsPerPage, movieCard.length, paginate);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div>
        <CardsDisplay gameRoomList={gameRoomList} loading={loading} />

        <Pagination
          className={styles.center}
          count={parseInt((gameRoomList.length - 1) / 10) + 1}
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  // return (
  //   <Box sx={{ flexGrow: 1 }}>
  //     <Grid
  //       container
  //       spacing={{ xs: 2, md: 4 }}
  //       columns={{ xs: 4, sm: 8, md: 20 }}
  //     >
  //       {gameRoomList.map((gameRoomInfo) => (
  //         <Grid xs={2} sm={4} md={4} key={gameRoomInfo}>
  //           <Item>
  //             <GameRoomItem
  //               title={gameRoomInfo.title}
  //               users={gameRoomInfo.users}
  //               src={gameRoomInfo.image_src}
  //             ></GameRoomItem>
  //           </Item>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   </Box>
  // );
}
