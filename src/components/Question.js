import React, { useState } from 'react';

const Question = ({ question, onAnswer, selectedAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    onAnswer(option.isCorrect, option.label);
  };

  return (
    <div className="question">
      <div className="question-container">
        <h2 className="sub-question">{question.question}</h2>
      </div>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={selectedOption === option.label ? 'selected' : ''}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
