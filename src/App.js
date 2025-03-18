import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [questions, setQuestions] = useState([]); // To store questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Current question index
  const [score, setScore] = useState(0); // Track the score
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track user's selected answer
  const [showExplanation, setShowExplanation] = useState(false); // Toggle explanation view

  // Load questions from the JSON file
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(shuffleArray(response.data));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  // Shuffle the questions randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Handle user answer selection
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);

    // Update score if the answer is correct
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Move to the next question
  const handleNextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);

    // Remove the current question from the list
    const remainingQuestions = [...questions];
    remainingQuestions.splice(currentQuestionIndex, 1);

    if (remainingQuestions.length === 0) {
      alert('Quiz done!'); // Replace this with a proper end-of-quiz UI
    } else {
      setQuestions(remainingQuestions);
      // Randomly pick the next question
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      setCurrentQuestionIndex(randomIndex);
    }
  };

  if (questions.length === 0) {
    return <p>Vragen ophalen...</p>; // Display a loading state while fetching questions
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h1>Quiz App</h1>
      <p>Score: {score}</p> {/* Score is always visible */}
      {!showExplanation ? (
        <>
          <h2>{currentQuestion.question}</h2>
          <div>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                disabled={selectedAnswer !== null} // Disable buttons after an answer is selected
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>{currentQuestion.question}</h2>
          <p>
            <strong>Jouw Antwoord:</strong> {selectedAnswer}
          </p>
          <p>
            <strong>Correct Antwoord:</strong> {currentQuestion.correctAnswer}
          </p>
          <p>
            <strong>Uitleg:</strong> {currentQuestion.explanation}
          </p>
          <button onClick={handleNextQuestion}>Volgende</button>
        </>
      )}
    </div>
  );
};

export default App;