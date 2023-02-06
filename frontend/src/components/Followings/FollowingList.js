import { useEffect, useState } from "react";
import axios from "axios";
import Item from "./FollowingListItem";
import styles from "./Followings.module.css";
import { useSelector } from "react-redux";
import { FaUsersSlash } from "react-icons/fa";

export default function FollowingList() {
  const [list, setlist] = useState([]);
  const baseUrl = useSelector((store) => store.baseUrl);
  const nowUserNo = useSelector((store) => store.userData.userNo);
  const user = useSelector((store) => store.userData);

  const getlist = () => {
    axios({
      method: "get",
      url: `${baseUrl}profile/${nowUserNo}/following`,
      data: { user_no: nowUserNo },
    })
      .then((res) => {
        setlist(res.data);
        console.log("res.data = ", res.data);
      })
      .catch((error) => console.log("following List 에러: ", error, user));
  };

  useEffect(() => {
    getlist();
    console.log("getList 결과", list);
  }, []);

  if (list.length > 0) {
    return (
      <div className={styles.FollowingList}>
        {list?.map((followInfo, idx) => {
          return (
            <Item
              userNo={followInfo.user_no}
              userName={followInfo.user_name}
              level={followInfo.level}
              userImage={followInfo.user_image_url}
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
