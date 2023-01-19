import "./Modal.css"

function GameGuideModal({setOpenModal}) {
 
  const closeModal = () => {
    setOpenModal(false)
  }

  return (
    <div className="modalcontainer">
      <button onClick={closeModal}>
        X
      </button>
      <p>모달 내용</p>
    </div>
  )
}

export default GameGuideModal