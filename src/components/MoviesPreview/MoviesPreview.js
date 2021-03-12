import React from 'react';
import PropTypes from 'prop-types';
import './MoviesPreview.scss';

const MoviesPreview = ({ title, name, poster }) => {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${
          poster ? poster : '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg'
        }`}
        alt={title}
        className="MoviesPreview__img"
      />
      <p>{title || name}</p>
    </>
  );
};

MoviesPreview.defaultProps = {
  poster: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
};

MoviesPreview.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  poster: PropTypes.string,
};

export default MoviesPreview;
