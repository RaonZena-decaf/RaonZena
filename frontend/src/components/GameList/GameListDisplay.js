import React from "react";
import Item from "./GameListItem";
import styles from "./GameList.module.css";

const GameRoomsDisplay = ({ gameRoomList, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={styles.GameRoomsDisplay}>
      {gameRoomList.map((gameRoomInfo, idx) => {
        return (
          <Item
            title={gameRoomInfo.roomTitle}
            users={gameRoomInfo.headcount}
            // image_src={gameRoomInfo.host.image_src}
            image_src="/GameThumbnail/1.png"
            headcount={gameRoomInfo.headcount}
            key={idx}
            roomNo={gameRoomInfo.roomNo}
          />
        );
      })}
    </div>
  );
};

export default GameRoomsDisplay;
