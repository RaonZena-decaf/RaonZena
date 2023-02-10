import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./FollowingListItem";
import styles from "./FollowingList.module.css";
import { useSelector } from "react-redux";
import { FaUsersSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FollowingList() {
  const [list, setlist] = useState([]);
  const baseUrl = useSelector((store) => store.baseUrl);
  const nowUserNo = useSelector((store) => store.userData.userNo);
  const user = useSelector((store) => store.userData);
  const [followUserNo, setFollowUserNo] = useState(1);
  const getlist = () => {
    if (nowUserNo) {
      axios({
        method: "get",
        url: `${baseUrl}profile/${nowUserNo}/following`,
        data: { userNo: nowUserNo },
      })
        .then((res) => {
          setlist(res.data);
        })
        .catch((error) => console.log("following List 에러: ", error, user));
    }
  };

  useEffect(() => {
    getlist();
  }, []);

  if (list.length > 0) {
    return (
      <div className={styles.FollowingList}>
        {list?.map((followInfo, idx) => {
          return (
            <Item
              userNo={followInfo.userNo}
              userName={followInfo.userName}
              level={followInfo.level}
              userImage={followInfo.userImageUrl}
              isOnline={followInfo.isOnline}
              key={idx}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <FaUsersSlash className={styles.NoGameRoomsImg} />
        <div className={styles.marginTopBot}>
          <p className={styles.NoGameRoomsText}>등록한 친구가 없습니다.</p>
        </div>
      </div>
    );
  }
}
