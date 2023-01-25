import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import GameRoomItem from "./GameRoomItem";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function GridGameRoom() {
  const gameRoomList = [
    { title: "title1", users: 3, image_src: "./Room1.png" },
    { title: "title2", users: 6, image_src: "./Room2.png" },
    { title: "title3", users: 1, image_src: "./Room3.png" },
    { title: "title4", users: 0, image_src: "./Room4.png" },
    { title: "title5", users: 1, image_src: "./Room5.png" },
    { title: "title6", users: 5, image_src: "./Room6.png" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 8, md: 20 }}
      >
        {gameRoomList.map((gameRoomInfo) => (
          <Grid xs={2} sm={4} md={4} key={gameRoomInfo}>
            <Item>
              <GameRoomItem
                title={gameRoomInfo.title}
                users={gameRoomInfo.users}
                src={gameRoomInfo.image_src}
              ></GameRoomItem>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
