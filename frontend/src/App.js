import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./routes/PageNotFound";
import Auth from "./routes/main/Auth";
import LivePage from "./routes/main/LivePage";
import NoDataLivePage from "./routes/main/NoDataLivePage";
import Landing from "./routes/main/Landing ";
import MainRoom from "./routes/rooms/MainRoom";
import KakaoLogin from "./routes/main/KakaoLogin";
import Create from "./routes/rooms/Create";
import ProfilePage from "./routes/main/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import BeforeRoom from "./routes/rooms/BeforeEnter";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/makeroom" element={<Create />} />
        <Route path="/beforeroom/:id" element={<BeforeRoom />} />
        <Route path="/profile/:userNo" element={<ProfilePage />} />
        <Route path="/NoDataLive" element={<NoDataLivePage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/uri" element={<Auth />} />
        <Route path="/room/:roomId" element={<MainRoom />} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
