import express from "express";
import { json } from "express";
import { spawn } from "child_process";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname); // Define __dirname

const app = express();
const port = process.env.PORT || 5000;

app.use(json());

// Serve the React app as static files
app.use(express.static(path.join(__dirname, "frontend/build")));

app.post("/api/solve", async (req, res) => {
  // ... (your solve route logic)
});

app.get("/api/reset", (req, res) => {
  // ... (your reset route logic)
});

// Define a catch-all route to serve the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
