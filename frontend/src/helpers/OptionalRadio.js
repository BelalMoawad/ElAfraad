import React from 'react';
import '../styles/OptionalRadio.css';

const OptionalRadio = ({ selectedOption, onOptionChange }) => {
  const handleOptionChange = (event) => {
    onOptionChange(event.target.id);
  };

  return (
    <div className="wrapper">
      <input
        type="radio"
        name="select"
        id="api_officer"
        checked={selectedOption === 'api_officer'}
        onChange={handleOptionChange}
      />
      <input
        type="radio"
        name="select"
        id="api_soldier"
        checked={selectedOption === 'api_soldier'}
        onChange={handleOptionChange}
      />
      <label htmlFor="api_officer" className="option api_officer">
        <div className="dot"></div>
        <span>ضباط</span>
      </label>
      <label htmlFor="api_soldier" className="option api_soldier">
        <div className="dot"></div>
        <span>درجات أخري</span>
      </label>
    </div>
  );
};

export default OptionalRadio;