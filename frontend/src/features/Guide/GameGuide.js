import GameGuideModal from "./GameGuideModal.js"
import { useState } from "react"

function GameGuide () {
  const [openModal, setOpenModal] = useState(false)

  const showmodal = () => {
    setOpenModal(true)
  }

  return (
    <div>
      <img 
        src="./Landing/GameGuide.png" 
        alt="" 
        className="guideimage"
        onClick={showmodal}/>
        {openModal && <GameGuideModal setOpenModal={setOpenModal}/>}
    </div>
  )
}

export default GameGuide