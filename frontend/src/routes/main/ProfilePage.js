import styles from "./ProfilePage.module.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer";
import ProfilePagePhoto from "../../components/ProfilePage/ProfilePagePhoto";
import ProfilePageInfo from "../../components/ProfilePage/ProfilePageInfo";
import { Transition } from "react-transition-group";
import ProfileModal from "../../components/ProfilePage/ProfileModal";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [nowContent, setNowContent] = useState();
  const [follower, setfollower] = useState();
  const [following, setfollowing] = useState();
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [feedList, setFeedList] = useState([])
  const location = useLocation();
  const baseUrl = useSelector((store)=> store.baseUrl)


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setNowContent();
      setfollower();
      setfollowing()
    }, 300);
  };

  async function getInfo () {
    const user_no = location.pathname.split("profile/")[1];
    await axios({
      method: "get",
      url: `${baseUrl}profile/${user_no}/follower`
    })
    .then((res) =>{
      setFollowerList(res.data)
    })
    .catch((error) => console.log(error))

    await axios({
      method: "get",
      url: `${baseUrl}profile/${user_no}/following`
    })
    .then((res) =>{
      setFollowingList(res.data)
    })
    .catch((error) => console.log(error))

    await axios({
      method: "get",
      url: `${baseUrl}profile/${user_no}/feedlist`
    })
    .then((res) =>{
      setFeedList(res.data)
    })
    .catch((error) => console.log(error))
  }
  
  useLayoutEffect(()=>{
    getInfo()
  },[location])

  return (
    <>
      <Navbar />
      <div className={styles.background}>
        <div className={styles.background2}>
          <div className={styles.background3}>
            <ProfilePageInfo
              handleOpen={handleOpen}
              setfollower={setfollower}
              setfollowing={setfollowing}
              followerList={followerList}
              followingList={followingList}
              feedList={feedList}
            />
            <ProfilePagePhoto
              handleOpen={handleOpen}
              setNowContent={setNowContent}
              feedList={feedList}
            />
          </div>
        </div>
        <Footer />
        <Transition unmountOnExit in={open} timeout={500}>
          {(state) => (
            <ProfileModal
              show={state}
              handleClose={handleClose}
              nowContent={nowContent}
              follower={follower}
              following={following}
            />
          )}
        </Transition>
      </div>
    </>
  );
}

export default ProfilePage;
