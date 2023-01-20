// import React, { useEffect, useState } from "react";
// import styles from "./navbar.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   // 페이지 이동을 위한 함수들
//   const navigate = useNavigate();
//   //const isLogin = JSON.parse(localStorage.getItem("token"));
//   const [isLogin, setisLogin] = useState(false);
//   const navigateToLanding = () => {
//     navigate("/");
//   };
//   const navigateToLive = () => {
//     navigate("/live");
//   };
//   const navigateToProfile = () => {
//     const userId = 1; // 현재 접속중인 유저 id를 가져와야 한다 redux든 아니면 back과의 통신이든
//     navigate(`/profile/:${userId}`);
//   };

//   const Login = () => {
//     const REST_API_KEY = "507ec57801bf562750f3dea88a7c2b99";
//     const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
//     const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
//     if (typeof window !== "undefined") {
//       window.location.href = KAKAO_AUTH_URL;
//     }
//   };

//   console.log("isLogin 값", isLogin);
//   console.log(typeof isLogin);

//   useEffect(() => {
//     setisLogin(JSON.parse(localStorage.getItem("token")));
//   }, [localStorage.getItem("token")]);

//   const Logout = () => {
//     localStorage.removeItem("token");
//     setisLogin(false);
//     navigateToLanding();
//   };

//   const navigateToCreateRoom = () => {
//     navigate("/room");
//   };
//   // 검색 기능을 위한 함수
//   const enterSearch = (event) => {
//     event.preventDefault();
//     if (search) {
//       console.log(search);
//       // navigate("/landing/")
//       return;
//     }
//   };
//   const [search, setSearch] = useState("");
//   const onChangeSearch = (event) => {
//     event.preventDefault();
//     setSearch(event.target.value);
//   };
//   return (
//     <div className={styles.div}>
//       <div className={styles.navbar}>
//         <div className={styles.groupParent} onClick={navigateToLanding}>
//           <div className={styles.rectangleWrapper}>
//             <img
//               className={styles.groupChild}
//               alt=""
//               src="../img/rectangle-1@2x.png"
//             />
//           </div>
//           <b className={styles.raonzena}>RaonZena</b>
//         </div>
//         <div className={styles.groupContainer}>
//           <div className={styles.rectangleParent}>
//             <div className={styles.groupItem} />
//             <form onSubmit={enterSearch}>
//               <input
//                 className={styles.searchRooms}
//                 placeholder="방 이름으로 검색"
//                 value={search}
//                 onChange={onChangeSearch}
//               ></input>
//               <FontAwesomeIcon
//                 icon={faMagnifyingGlass}
//                 className={styles.iconSearch}
//                 onClick={enterSearch}
//               />
//             </form>
//           </div>
//           <div className={styles.home} onClick={navigateToLanding}>
//             홈
//           </div>
//           <div className={styles.home} onClick={navigateToLive}>
//             라이브
//           </div>

//           {isLogin ? (
//             <div>
//               {/* <div
//                 className={styles.rectangleGroup}
//                 onClick={navigateToProfile}
//               >
//                 <div className={styles.groupInner} />
//                 <FontAwesomeIcon
//                   icon={faCircleUser}
//                   className={styles.iconUserCircle}
//                 />
//                 <div className={styles.profile}>Profile</div>
//               </div> */}
//               <div className={styles.rectangleGroup}>
//                 <div className={styles.groupInner} />
//                 <FontAwesomeIcon
//                   icon={faCircleUser}
//                   className={styles.iconUserCircle}
//                 />
//                 <div className={styles.profile} onClick={Logout}>
//                   Logout
//                 </div>
//               </div>

//               <div
//                 className={styles.rectangleContainer}
//                 onClick={navigateToCreateRoom}
//               >
//                 <div className={styles.rectangleDiv} />
//                 <div className={styles.createRoom}>Create Room</div>
//               </div>
//             </div>
//           ) : (
//             <div className={styles.rectangleGroup}>
//               <div className={styles.groupInner} onClick={Login} />
//               <FontAwesomeIcon
//                 icon={faCircleUser}
//                 className={styles.iconUserCircle}
//               />
//               <div className={styles.profile}>Login</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
