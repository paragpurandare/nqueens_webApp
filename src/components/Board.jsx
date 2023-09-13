import React, { useState } from 'react';
import axios from 'axios';

const Board = () => {
  const [n, setN] = useState(8); // The size of the chessboard
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const solveNQueens = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post('/api/solve', { n });
      setSolutions(response.data);
    } catch (error) {
      console.error('Axios error:', error);
      setError('An error occurred while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  const resetBoard = async () => {
    setError(null); // Clear any previous errors

    try {
      await axios.get('/api/reset');
      setSolutions([]);
    } catch (error) {
      console.error('Axios error:', error);
      setError('An error occurred while resetting the board.');
    }
  };

  return (
    <div>
      <h1>N-Queens Game</h1>
      <label>
        Board Size:
        <input type="number" value={n} onChange={(e) => setN(e.target.value)} />
      </label>
      <button onClick={solveNQueens} disabled={loading}>
        Solve
      </button>
      <button onClick={resetBoard}>Reset</button>

      {/* Display any error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Render the chessboard and solutions */}
      <div>
        <h2>Solutions:</h2>
        <ul>
          {solutions.map((solution, index) => (
            <li key={index}>{solution}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Board;
