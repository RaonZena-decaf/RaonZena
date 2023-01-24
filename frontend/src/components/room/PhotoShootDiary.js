import "./PhotoShootDiary.css";

function PhotoShootDiary() {
  return (
    <div className="photoshootdiaryflex">
      <div className="photoshootdiaryflex2">
        <select className="photoshootdiaryselect" defaultValue="프레임 선택">
          <option value="프레임 선택" disabled hidden>
            프레임 선택
          </option>
          <option value={1}>라온제나</option>
          <option value={2}>레트로 게임방</option>
          <option value={3}>바다 속 도시</option>
          <option value={4}>우주 유영</option>
        </select>
        <input
          className="photoshootdiaryinput"
          placeholder="제목을 입력해 주세요"
        ></input>
        <textarea
          className="photoshootdiarytextarea"
          placeholder="간단한 기록을 남겨보세요(300자 이내)"
          maxLength={300}
        ></textarea>
      </div>
      <div className="photoshootdiaryflex3">
        <button className="photoshootdiarybutton">피드에 등록하기</button>
        <button className="photoshootdiarybutton2">취소</button>
      </div>
    </div>
  );
}

export default PhotoShootDiary;
