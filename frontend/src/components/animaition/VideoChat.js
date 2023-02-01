import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./VideoChat.json";

const VideoChat = () => {
  const Chat = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: Chat.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);
  return (
    <div ref={Chat} 
    style={{ 
      width: "30vw",
      right: "10%",
      transform: "translateY(-10%)",
    }}></div>
  );
};

export default VideoChat;
