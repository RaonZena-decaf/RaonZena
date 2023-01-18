import "./UserGuide.css"
import { useEffect, useRef, useState } from "react";

function UserGuide () {
  const containerCarosel = useRef()
  const [nowX,setNowX] = useState(0)

  useEffect(() => {
    containerCarosel.current.style.transform = `translateX(${nowX}vw)`
  }, [nowX])

  const pageBtn1 = useRef()
  const pageBtn2 = useRef()
  const pageBtn3 = useRef()
  

  const clickbutton1 = () => {
    setNowX((prop) => prop = 0.3)
    pageBtn1.current.style.backgroundColor = "#F400B0"
    pageBtn2.current.style.backgroundColor = "#cacaca"
    pageBtn3.current.style.backgroundColor = "#cacaca"
  }
  const clickbutton2 = () => {
    setNowX((prop) => prop = -69.1)
    pageBtn2.current.style.backgroundColor = "#F400B0"
    pageBtn1.current.style.backgroundColor = "#cacaca"
    pageBtn3.current.style.backgroundColor = "#cacaca"
  }
  const clickbutton3 = () => {
    setNowX((prop) => prop = -138.6)
    pageBtn3.current.style.backgroundColor = "#F400B0"
    pageBtn2.current.style.backgroundColor = "#cacaca"
    pageBtn1.current.style.backgroundColor = "#cacaca"
  }




  return (
    <div className="carousel">
      <div className="carouselcontainer" ref={containerCarosel}>
        <div className="inner">
          <img src="./Landing/GameGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/PhotoGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/ChattingGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/ImageGameGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/TresureHuntGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/CatchMindGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/ShoutInSilenceGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/PersonQuizGuide.png" alt=""/>
        </div>
        <div className="inner">
          <img src="./Landing/LotteryGuide.png" alt=""/>
        </div>
      </div>  
      <div className="buttonlist">
        <div className="circlebutton active" onClick={clickbutton1} ref={pageBtn1}></div>
        <div className="circlebutton" onClick={clickbutton2} ref={pageBtn2}></div>
        <div className="circlebutton" onClick={clickbutton3} ref={pageBtn3}></div>
      </div>
    </div>
 )
}
  
  export default UserGuide