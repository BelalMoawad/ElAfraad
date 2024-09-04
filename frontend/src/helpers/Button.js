import React from 'react';
import '../styles/Button.css';

const Button = ({ text, onClick }) => {
    return (
      <button className="cool-button" onClick={onClick}>
        {text}
      </button>
    );
};
  
  export default Button;