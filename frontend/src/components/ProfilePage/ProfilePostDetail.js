import styles from "./ProfilePostDetail.module.css";
import { FaCrown, FaTrash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ProfilePostDetail({ nowContent, handleClose }) {
  //임시값, axios 구현 후 비워놓을 것
  const [users, serUsers] = useState([
    { user_name: "김찬빈", user_image_url: "../profile/profileimg.png" },
    { user_name: "김민소", user_image_url: "../profile/profileimg.png" },
    { user_name: "최지연", user_image_url: "../profile/profileimg.png " },
  ]);

  // nowContent.firstUser
  // nowContent.SecondUser
  // nowContent.ThirdUser
  // 각각의 유저 이름과 유저 프로필 사진 데이터를 요청. axios로 요청


  // 받은 날짜 데이터를 수정
  const date = new Date(nowContent.createDtm)
  const timestamp = date.toLocaleString().slice(0, -3)

  const baseUrl = useSelector((store)=>store.baseUrl)
  // 피드 삭제 요청 함수
  async function feedDelete() {
    if (window.confirm("기록을 삭제하시겠습니까?")) {
      await handleClose()
      await axios({
        method:"delete",
        url : `${baseUrl}profile/feedDelete/${nowContent.boardNo}`
      }).then((res) => {
        console.log('삭제됨')
      }).catch(error => console.error)
      alert("삭제하였습니다.")
    } else {
      alert("취소하였습니다.") 
    }
  }


  return (
    <div className={styles.background}>
      <p className={styles.text}>{nowContent.title}</p>
      <img src={nowContent.boardImageUrl} className={styles.img} alt="img" />
      <p className={styles.text2}>{timestamp}에 기록</p>
      {nowContent.firstUser !== 0 && (
        <div className={styles.OutContainer}>
          <FaCrown className={styles.icon} />
          <div className={styles.LargeContainer}>
            <div className={styles.SmallContainer}>
              <img
                src={users[1].user_image_url}
                alt="img"
                className={styles.profileImg}
              />
              <span>{users[1].user_name}</span>
              <div className={styles.InnerContainer2}>
                <span>2</span>
              </div>
            </div>
            <div className={styles.SmallContainer}>
              <img
                src={users[0].user_image_url}
                alt="img"
                className={styles.profileImg}
              />
              <span>{users[0].user_name}</span>
              <div className={styles.InnerContainer1}>
                <span>1</span>
              </div>
            </div>
            <div className={styles.SmallContainer}>
              <img
                src={users[2].user_image_url}
                alt="img"
                className={styles.profileImg}
              />
              <span>{users[2].user_name}</span>
              <div className={styles.InnerContainer3}>
                <span>3</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.textarea}>{nowContent.content}</div>
      <FaTrash className={styles.deleteBtn} onClick={()=>feedDelete()}/>
    </div>
  );
}

export default ProfilePostDetail;
