import React from 'react';

const Progress = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
      <div className="progress-text">
        {current}/{total}
      </div>
    </div>
  );
};

export default Progress;
