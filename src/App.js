import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './components/Board';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Board />} />
        {/* Add additional routes for instructions, about, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
