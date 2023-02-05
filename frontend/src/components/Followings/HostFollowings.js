import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./HostFollowingsItem";
import styles from "./Followings.module.css";
import { useSelector } from "react-redux";
import { FaUserTimes } from "react-icons/fa";


const HostFollowings = ({ HostFollowingsList, loading }) => {
  const [list, setList] = useState([]);
  const baseUrl = useSelector((store)=>store.baseUrl)
  const nowUserNo = useSelector((store)=>store.userData.user_no)

  const getlist = () => {
    axios({
      method:"get",
      url :`${baseUrl}live/following`,
      data : {user_no : nowUserNo}
    }).then((res)=>{
      setList(res.data.content)
    }).catch(error =>
      console.log(error))
  }
  useEffect(()=>{
    getlist()
  },[])

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (list.length > 0) {
    return (
      <div className={styles.HostFollowingsList}>
        {list?.map((gameRoomInfo, idx) => {
          return (
            <Item
              key={idx}
              userName={gameRoomInfo.host.user_name}
              userImage={gameRoomInfo.host.user_image_url}
              level={gameRoomInfo.host.level}
              roomTitle={gameRoomInfo.room_title}
              headcount={gameRoomInfo.headcount}
              password={gameRoomInfo.password}
              // 자동으로 이미지 뽑기 (redux)
              // roomImage={gameRoomInfo.room_image}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <FaUserTimes className={styles.NoGameRoomsImg}/>
        <div className={styles.marginTopBot}>
          <p className={styles.NoGameRoomsText}>
            지금 놀고 있는 친구가 없습니다.
          </p>
        </div>
      </div>
    );
  }
};

export default HostFollowings;
