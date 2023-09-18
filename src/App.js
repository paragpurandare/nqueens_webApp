import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [n, setN] = useState(8);
    const [solutions, setSolutions] = useState([]);
    const [isSolved, setIsSolved] = useState(false);

    const handleSizeChange = (event) => {
        setN(event.target.value);
    };

    const solvePuzzle = async () => {
        try {
            const response = await axios.post('/solveNQueens', { n });
            setSolutions(response.data.solutions);
            setIsSolved(true);
        } catch (error) {
            console.error('Error solving N-Queens:', error);
        }
    };

    return (
        <div className="App">
            <h1>N-Queens Puzzle Solver</h1>
            <div className="board">
                <label>
                    Board Size:
                    <input type="number" value={n} onChange={handleSizeChange} min="1" />
                </label>
                <button onClick={solvePuzzle}>Solve</button>
                {isSolved ? (
                    <div className="solutions">
                        <h2>Solutions:</h2>
                        {solutions.map((solution, index) => (
                            <div key={index} className="solution">
                                {solution}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;
