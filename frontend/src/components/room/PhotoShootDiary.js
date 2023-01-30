import styles from "./PhotoShootDiary.module.css"

function PhotoShootDiary({setPhotoFrame , closeMenu}) {
  // 유저 정보에서 소지 프레임에 따라 option 렌더링이 달라져야 함
  const frameSelect = (e) => {
    setPhotoFrame(e.target.value)
  }

  return (
    <div className={styles.photoshootdiaryflex}>
      <select className={styles.photoshootdiaryselect} onChange={frameSelect} defaultValue="프레임 선택">
        <option value="프레임 선택" disabled hidden>
          프레임 선택
        </option>
        <option value={1}>라온제나</option>
        <option value={2}>레트로 게임방</option>
        <option value={3}>바다 속 도시</option>
        <option value={4}>우주 유영</option>
      </select>
      <input
        className={styles.photoshootdiaryinput}
        placeholder="제목을 입력해 주세요"
      ></input>
      <textarea
        className={styles.photoshootdiarytextarea}
        placeholder="간단한 기록을 남겨보세요(300자 이내)"
        maxLength={300}
      ></textarea>
      <div className={styles.photoshootdiaryflex3}>
        <button className={styles.photoshootdiarybutton}>피드에 등록</button>
        <button className={styles.photoshootdiarybutton2} onClick={closeMenu}>취소</button>
      </div>
    </div>
  );
}

export default PhotoShootDiary;
