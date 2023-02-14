export default function GameOverModal(props) {
    return (
      <div
        className={`modal ${props.show ? "display-block" : "display-none"}`}
      >
        <section className="modal-main">
          <h1>게임 종료</h1>
          <button onClick={props.restart}>다시 시작</button>
          <button onClick={props.closeModal}>닫 기</button>
        </section>
      </div>
    );
  }