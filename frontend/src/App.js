import { Component, React } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./routes/PageNotFound";
import Auth from "./routes/main/Auth";
import NavBar from "./components/navbar/navbar";
import LivePage from "./components/LivePage/LivePage";
import NoDataLivePage from "./components/NoDataLivePage/NoDataLivePage";
import ChatingSubjectLoding from "./components/room/ChatingSubjectLoding";
import ChatingSubject from "./components/room/ChatingSubject";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/room/makeroom" element={} />
        <Route path="/room/before" element={} />
        <Route path="/room/:roomId" element={} />
        <Route path="/room/:roomId/games" element={} />
        <Route path="/room/:roomId/games/:gameId" element={} />
        <Route path="/room/:roomId/picture" element={} />
        <Route path="/profile/:userNo" element={} /> */}
        {/* <Route path="/login" element={<Login /> } /> */}
        <Route path="/NoDataLive" element={<NoDataLivePage />} />
        <Route path="/live" element={<LivePage />} />
        <Route path="uri/" element={<Auth />}></Route>
        <Route path="/" element={<NavBar />} />
        <Route
          path="/ChatingSubjectLoding"
          element={<ChatingSubjectLoding />}
        />
        <Route path="/ChatingSubject" element={<ChatingSubject />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
