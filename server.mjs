import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static frontend files
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(bodyParser.json());

app.post('/solveNQueens', async (req, res) => {
    const n = req.body.n;

    const childProcess = spawn('nqueens.exe', [`${n}`], {
        cwd: __dirname, // Set the current directory as the working directory
    });

    let outputData = '';
    let errorData = '';

    childProcess.stdout.on('data', (data) => {
        outputData += data.toString();
    });

    childProcess.stderr.on('data', (data) => {
        errorData += data.toString();
    });

    childProcess.on('close', (code) => {
        if (code === 0) {
            const solutions = outputData.split('\n').filter(Boolean);
            res.json({ solutions });
        } else {
            console.error('C code execution error:', errorData);
            res.status(500).json({ error: 'Failed to run C code' });
        }
    });
});

// Serve the frontend index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(5000, '0.0.0.0', () => {
    console.log(`Server is running on port 5000`);
});
