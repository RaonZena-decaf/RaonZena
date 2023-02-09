import axios from "axios";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Modal.module.css";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import NoResult from "./NoResult";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { modifyMyFollowingList } from "../../app/myFollowingList";


const SearchResult = ({ search, closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const baseUrl = useSelector((store) => store.baseUrl);
  const [Result, setResult] = useState([]);
  const MyFollowingList = useSelector((store) => store.myFollowingList);
  const UserNo = useSelector((store) => store.userData.userNo);
  

  const navigateToProfile = (props) => {
    navigate(`/profile/${props}`);
    closeModal();
  };

  async function Follow(userNo) {
    await axios({
      method:"POST",
      url:`${baseUrl}profile`,
      data: {"followNo": userNo},
      Headers:{"Content-Type": 'application/json'}
    }).then((res)=>{
      dispatch(modifyMyFollowingList([...MyFollowingList, userNo]))
    }).catch(error => console.log(error))

  }

  //검색어를 받고 유저를 검색
  useLayoutEffect(() => {
    async function searchUser() {

      if (search) {
        await axios({
          method: "get",
          url: `${baseUrl}profile`,
          params: { keyword: search },
        })
          .then((res) => {
            setResult(res.data);
          })
          .catch((error) => console.log(error));
      }
    }

    searchUser();
  }, [search, MyFollowingList]);

  return (
    <div className={styles.searchBody}>
      {search ? (
        Result.length === 0 ? (
          <NoResult />
        ) : (
          Result.map((user) => (
            <div key={user.userName} className={styles.searchResultInfo}>
              <div
                className={styles.FollowingsInfo}
                onClick={() => {
                  navigateToProfile(user.userNo);
                }}
              >
                <img
                  src={user.userImageUrl}
                  className={styles.ProfileImg}
                  alt="프로필"
                />
                <div className={styles.FollowingInfoFont}>
                  <p>LV {user.level}</p>
                </div>
                <div className={styles.FollowingInfoFont}>
                  <p>{user.userName}</p>
                </div>
              </div>
              {MyFollowingList.includes(user.userNo) || UserNo ==="" ? null : (
                <FaUserPlus className={styles.followBtn} onClick={() => {Follow(user.userNo)}}/>
              )}
            </div>
          ))
        )
      ) : (
        <NoResult />
      )}
    </div>
  );
};

export default memo(SearchResult);
