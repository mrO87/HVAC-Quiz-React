const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const FILE_PATH = path.join(__dirname, "questions.json");

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Correct spelling of "cors"

// Initialize the file if it does not exist
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, JSON.stringify([]));
}

// Get all questions
app.get("/questions", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    res.json(data);
  } catch (error) {
    console.error("Error reading questions.json:", error); // Fixed error logging
    res.status(500).json({ error: "Failed to load questions." });
  }
});

// Save or update a question
app.post("/questions", (req, res) => {
  const { id, question, options, correctAnswer, explanation } = req.body;

  if (!id || !question || !options || !correctAnswer || !explanation) {
    return res.status(400).json({ message: "Invalid request data." });
  }

  if (options.length < 2) {
    return res.status(400).json({ message: "Please include at least two options." });
  }

  try {
    const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    const existingIndex = data.findIndex((q) => q.id === id);

    if (existingIndex >= 0) {
      // Update existing entry
      data[existingIndex] = { id, question, options, correctAnswer, explanation };
    } else {
      // Add a new entry
      data.push({ id, question, options, correctAnswer, explanation });
    }

    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    res.json({ message: "Question saved successfully.", data });
  } catch (error) {
    console.error("Error saving question:", error);
    res.status(500).json({ error: "Failed to save question." });
  }
});

// Get question by ID
app.get("/questions/:id", (req, res) => {
  const { id } = req.params;

  try {
    const data = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    const question = data.find((q) => q.id === parseInt(id, 10));

    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: "Question not found." });
    }
  } catch (error) {
    console.error("Error reading questions.json:", error);
    res.status(500).json({ error: "Failed to load question." });
  }
});

// API endpoint to fetch all questions
app.get("/api/questions", (req, res) => {
  try {
    const questions = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    res.json(questions); // Send the questions as a JSON response
  } catch (error) {
    console.error("Error reading questions.json:", error);
    res.status(500).json({ error: "Failed to load questions." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});