import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing  from './routes/main/Landing '

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Landing />} exact />
      </Routes>
    </Router>
  );
}

export default App;
