import React, { useState, useEffect } from "react";
import Question from "./Question";
import questionsData from "../data/questions.json";
import Summary from "./Summary";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [answers, setAnswers] = useState({});
  const [clickedNext, setClickedNext] = useState(false);
  const [clickedPrevious, setClickedPrevious] = useState(false);

  useEffect(() => {
    setQuestions(shuffleQuestions(questionsData.questions));
  }, []);

  // Function to shuffle the questions array
  const shuffleQuestions = (questions) => {
    let shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [
        shuffledQuestions[j],
        shuffledQuestions[i],
      ];
    }
    return shuffledQuestions;
  };

  const handleAnswer = (isCorrect, selectedOption) => {
    if (isCorrect) setScore(score + 1);
    setAnswers({
      ...answers,
      [currentQuestionIndex]: selectedOption,
    });

    // Add a delay before moving to the next question
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        setShowSummary(true);
      }
    }, 300); // 300ms delay to allow the UI to update
  };

  const handlePrevious = () => {
    setClickedPrevious(true);
    setClickedNext(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    setClickedNext(true);
    setClickedPrevious(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (showSummary) {
    return <Summary score={score} total={questions.length} />;
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="main-container">
      <div className="progress-container">
        <div className="navigation">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={clickedPrevious ? "clicked" : ""}
          >
            Previous
          </button>
          <div className="progress-text">{`${currentQuestionIndex + 1}/${
            questions.length
          }`}</div>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className={clickedNext ? "clicked" : ""}
          >
            Next
          </button>
        </div>
        <div className="progress-bar-background">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="question-main-container">
        {questions.length > 0 && (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestionIndex]}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
