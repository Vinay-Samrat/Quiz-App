import React from 'react';

const Summary = ({ score, total }) => {
  return (
    <div className="summary">
      <h2>Quiz Summary</h2>
      <p>Your score is {score} out of {total}</p>
    </div>
  );
};

export default Summary;
