import React from 'react';
import PropTypes from 'prop-types';
import './LoadMoreButton.scss';

const Button = ({ handleOnClick }) => (
  <button className="Button" onClick={handleOnClick} type="button">
    Load more
  </button>
);

Button.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default Button;
