import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Counter from './routes/Counter'

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
        <Route path="/" element={< Counter />} />
        {/* <Route path="*" element={< NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
