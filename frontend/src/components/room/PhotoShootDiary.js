import styles from "./PhotoShootDiary.module.css";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

function PhotoShootDiary({ setPhotoFrame, closeMenu }) {
  // redux에 저장된 유저 정보에서 레벨에 따라 option 렌더링이 달라져야 함
  const userlevel = useSelector((store) => store.userData.level);
  const baseUrl = useSelector((store)=> store.baseUrl)

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

  //이미지 url을 저장하는 State
  const img = useRef("");

  //imgur에 이미지를 호스팅하는 통신
  const uploadImgur = (url) => {
    const apiBase = "https://api.imgur.com/3/image";
    axios
      .post(
        apiBase,
        {
          image: url,
          type: "base64",
        },
        {
          headers: {
            Authorization: "Client-ID b57014f88dac659",
          },
        }
      )
      .then((res) => {
        img.current = res.data.data.link;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 사진 영역을 촬영하는 함수
  const copyDOM = async () => {
    window.scrollTo(0, 0);

    let url = "";
    await html2canvas(document.getElementById("사진촬영완료")).then(
      async (canvas) => {
        url = await canvas.toDataURL("image/jpg",'capture')
        // url = await canvas.toDataURL("image/webp").split(",")[1];
      }
    );
    console.log(url)

    await uploadImgur(url);
  };

  //피드에 저장하는 axios 통신
  const user_no = useSelector((store) => store.user_no);

  const save = () => {
    let question = window.confirm("사진을 저장하겠습니까?");
    if (question === true) {
      let today = new Date()
      // 화상 쪽 div를 선택하고 이미지 url을 제작, 이후 axios 통신을 통해 자신의 프로필에 저장
      copyDOM()
      console.log(today)
      console.log({
        "board_image_url": img.current,
        "title": input.title,
        "content": input.content,
        "create_dtm" : today.toLocaleString() 
      })
      axios({
        url:`${baseUrl}games/feed/${user_no}`,
        method:"POST",
        data : {
          "board_image_url": img.current,
          "title": input.title,
          "content": input.content,
          "create_dtm" : today.toLocaleString() 
        },
      }).then((res) => {
        alert("사진이 저장되었습니다.");
      }).catch(error => {
        alert("저장에 실패하였습니다. 다시 시도해 주세요.")
      })
    } else {
      alert("취소하였습니다.");
    }
  };

  return (
    <div className={styles.photoshootdiaryflex}>
      <select
        className={styles.photoshootdiaryselect}
        onChange={frameSelect}
        defaultValue="프레임 선택"
      >
        <option value="프레임 선택" disabled hidden>
          프레임 선택
        </option>
        <option value={1}>라온제나</option>
        <option value={2}>레트로 게임</option>
        {userlevel > 5 && <option value={3}>노을진 도시</option>}
        {userlevel > 10 && <option value={4}>우주 유영</option>}
        {userlevel > 15 && <option value={5}>우주 유영</option>}
        {userlevel > 20 && <option value={6}>우주 유영</option>}
      </select>
      <input
        className={styles.photoshootdiaryinput}
        name="title"
        placeholder="제목을 입력해 주세요"
        onChange={onChange}
      ></input>
      <textarea
        className={styles.photoshootdiarytextarea}
        name="content"
        placeholder="간단한 기록을 남겨보세요(300자 이내)"
        onChange={onChange}
        maxLength={300}
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
