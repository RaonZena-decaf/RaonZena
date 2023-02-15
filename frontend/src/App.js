import { React } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./routes/PageNotFound";
import LivePage from "./routes/main/LivePage";
import Landing from "./routes/main/Landing ";
import MainRoom from "./routes/rooms/MainRoom";
import KakaoLogin from "./routes/main/KakaoLogin";
import Create from "./routes/rooms/Create";
import ProfilePage from "./routes/main/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import BeforeRoom from "./routes/rooms/BeforeEnter";
import PrivateRoute from "./PrivateRoute";
// Assume this is a boolean that indicates whether the user is logged in or not

function App() {
  const user = useSelector((store) => store.userData);
  const Isloggin = user.userId !== "" ? true : false;

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/profile/:userNo" element={<ProfilePage />} />
        {/* Only allow access to these routes if the user is logged in */}
        <Route
          path="/makeroom"
          element={
            <PrivateRoute authenticated={Isloggin} component={<Create />} />
          }
        />
        <Route
          path="/beforeroom/:id"
          element={
            <PrivateRoute authenticated={Isloggin} component={<BeforeRoom />} />
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <PrivateRoute authenticated={Isloggin} component={<MainRoom />} />
          }
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
