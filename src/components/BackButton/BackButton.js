import React from 'react';
import './BackButton.scss';

const BackButton = ({ onBack }) => (
  <button onClick={onBack} className="BackButton" type="button">
    Back
  </button>
);

export default BackButton;
