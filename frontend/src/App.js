import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./components/navbar/navbar";

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
        <Route path="/live" element={} />
        <Route path="/profile/:userNo" element={} /> */}
        <Route path="/" element={<NavBar />} />
        {/* <Route path="*" element={< NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
