import React from 'react';
import PropTypes from 'prop-types';
import './BackButton.scss';

const BackButton = ({ onBack }) => (
  <button onClick={onBack} className="BackButton" type="button">
    Back
  </button>
);

BackButton.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default BackButton;
