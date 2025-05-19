import React from 'react';
import '../styles/CircleSelector.css';

const CircleSelector = ({ circles, selected, onSelect }) => {
  return (
    <div className="circle-selector">
      <div className="circles-grid">
        {circles.map((circle, index) => (
          <button
            key={index}
            className={`circle-button ${selected === index ? 'selected' : ''}`}
            onClick={() => onSelect(index)}
          >
            {circle.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CircleSelector;
