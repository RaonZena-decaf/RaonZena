import React from "react";
import GameRoom from "./GameRoom";
import Item from "./Item";
import styles from "./GameRoom.module.css";

const CardsDisplay = ({ gameRoomList, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {gameRoomList?.map((gameRoomInfo) => {
        return (
          <Item
            title={gameRoomInfo.title}
            users={gameRoomInfo.users}
            image_src={gameRoomInfo.image_src}
          />
        );
      })}
    </div>
  );
};

export default CardsDisplay;
