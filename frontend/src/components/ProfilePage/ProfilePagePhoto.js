import styles from "./ProfilePagePhoto.module.css";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

function ProfilePagePhoto({ handleOpen, setNowContent,feedList }) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#222222",
    boxShadow: "none",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {feedList.map((photo, idx) => {
            return (
              <Grid xs={2} sm={4} md={4} key={idx}>
                <Item
                  className={styles.photocard}
                  onClick={() => {
                    handleOpen();
                    setNowContent(photo);
                  }}
                >
                  <img className={styles.img} src={photo.boardImageUrl} alt={photo.title} />
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
  );
}
export default ProfilePagePhoto;
