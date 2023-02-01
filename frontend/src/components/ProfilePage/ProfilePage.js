import styles from "./ProfilePage.module.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/Footer";
import ProfilePagePhoto from "./ProfilePagePhoto";
import ProfilePageInfo from "./ProfilePageInfo";
import { Transition } from "react-transition-group";
import ProfileModal from "./ProfileModal";
import { useState } from "react";

function ProfilePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nowContent, setNowContent] = useState({});

  return (
    <div className={styles.background}>
      <Navbar />
      <div className={styles.background2}>
        <div className={styles.background3}>
          <ProfilePageInfo />
          <ProfilePagePhoto
            handleOpen={handleOpen}
            setNowContent={setNowContent}
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
          />
        )}
      </Transition>
    </div>
  );
}

export default ProfilePage;
