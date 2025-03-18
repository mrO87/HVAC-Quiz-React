const fs = require("fs");
const path = require("path");
const axios = require("axios");

const FILE_PATH = path.join(__dirname, "questions.json");
console.log("Saving to file:", FILE_PATH);

// Load questions.json
const loadQuestions = () => {
  const fileData = fs.readFileSync(FILE_PATH, "utf8");
  return JSON.parse(fileData);
};

// Save updated questions back to file
const saveQuestions = (questions) => {
  
  fs.writeFileSync(FILE_PATH, JSON.stringify(questions, null, 2));
  console.log("question saved succesfully!");
};

// Fetch explanation from ChatGPT
const fetchExplanation = async (question, correctAnswer) => {
  const prompt = `leg bondig uit waarom ${correctAnswer} het juiste antwoord is voor: ${question}.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "je bent een leerkracht koeltechnieken. geef korte duidelijke en educatieve uitleg voor hvac studenten die zich voorbereiden op hun examen.",
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_QUIZ_API_KEY}`, // Securely access the API key
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching explanation:", error.response?.data || error.message);
    return "Unable to fetch explanation.";
  }
};

// Main function to populate explanations
const populateExplanations = async () => {
  const questions = loadQuestions();

  for (let question of questions) {
    if (!question.explanation || question.explanation.trim() === "") {
      console.log(`Fetching explanation for Question ID: ${question.id}`);
      const explanation = await fetchExplanation(question.question, question.correctAnswer);
      question.explanation = explanation;
      console.log(`Explanation fetched: ${explanation}`);
      saveQuestions(questions);
    }
  }
  console.log("Updated questions:", questions);
  saveQuestions(questions);
  console.log("Explanations populated and saved successfully!");
};

// Execute the script
populateExplanations();