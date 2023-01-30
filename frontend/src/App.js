import { React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./routes/PageNotFound";
import Auth from "./routes/main/Auth";
import LivePage from "./routes/main/LivePage";
import NoDataLivePage from "./routes/main/NoDataLivePage";
import Landing from "./routes/main/Landing ";
import MainRoom from "./routes/rooms/MainRoom"
import KakaoLogin from "./routes/main/KakaoLogin"

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/room/makeroom" element={} />
        <Route path="/room/before" element={} /> */}
        {/* <Route path="/room/:roomId/games/:gameId" element={} /> */}
        {/* <Route path="/profile/:userNo" element={} /> */}
        <Route path="/NoDataLive" element={<NoDataLivePage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="/uri" element={<Auth />} />
        <Route path="/" element={<Landing />} />
        <Route path="/room/:roomId" element={<MainRoom/>} />
        <Route path="/oauth/kakao/callback" element={<KakaoLogin/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
