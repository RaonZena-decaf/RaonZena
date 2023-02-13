import styles from "./PhotoShootDiary.module.css";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

function PhotoShootDiary({ setPhotoFrame, closeMenu, frames }) {
  // redux에 저장된 유저 정보에서 레벨에 따라 option 렌더링이 달라져야 함
  const baseUrl = useSelector((store) => store.baseUrl);
  const title = useRef();
  const content = useRef();

  const frameSelect = (e) => {
    setPhotoFrame(e.target.value);
  };

  //입력한 제목, 내용을 저장하는 State
  const [input, setInput] = useState({
    title: "",
    content: "",
  });
  const onChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  //피드에 저장하는 axios 통신
  const userNo = useSelector((store) => store.userData.userNo);
  async function save() {
    if (input.title === "") {
      title.current.focus();
    } else if (input.content === "") {
      content.current.focus();
    } else {
      let question = window.confirm("사진을 저장하겠습니까?");
      if (question === true) {
        const formData = new FormData();
        // 화상 쪽 div를 선택하고 이미지 url을 제작, 이후 axios 통신을 통해 자신의 프로필에 저장

        // 사진 영역을 촬영하는 함수
        await html2canvas(document.querySelector("#사진촬영완료"), {
          allowTaint: false,
          useCORS: true,
        }).then(async (canvas) => {
          const day = new Date();
          const dataUrl = canvas.toDataURL("image/png");
          const blobBin = atob(dataUrl.split(",")[1]);
          let array = [];
          for (let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
          }
        });
        const data = {
          boardImageUrl: "",
          title: input.title,
          content: input.content,
          firstUser: 0,
          secondUser: 0,
          thirdUser: 0,
          userNo: userNo,
        };
        formData.append(
          "boardReq",
          new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        axios({
          url: `${baseUrl}games/feed`,
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            alert("사진이 저장되었습니다.");
            closeMenu();
          })
          .catch((error) => {
            alert("저장에 실패하였습니다. 다시 시도해 주세요.");
            closeMenu();
          });
      } else {
        alert("취소하였습니다.");
      }
    }
  }

  return (
    <div className={styles.photoshootdiaryflex}>
      {frames ? (
        <select
          className={styles.photoshootdiaryselect}
          onChange={frameSelect}
        >
          {frames.map((frame) => (
            <option value={frame.imageUrl}>{frame.imageName}</option>
          ))}
        </select>
      ) : null}

      <input
        className={styles.photoshootdiaryinput}
        name="title"
        placeholder="제목을 입력해 주세요"
        onChange={onChange}
        ref={title}
      ></input>
      <textarea
        className={styles.photoshootdiarytextarea}
        name="content"
        placeholder="간단한 기록을 남겨보세요(300자 이내)"
        onChange={onChange}
        maxLength={300}
        ref={content}
      ></textarea>
      <div className={styles.photoshootdiaryflex3}>
        <button className={styles.photoshootdiarybutton} onClick={save}>
          등록
        </button>
        <button className={styles.photoshootdiarybutton2} onClick={closeMenu}>
          취소
        </button>
      </div>
    </div>
  );
}

export default PhotoShootDiary;
