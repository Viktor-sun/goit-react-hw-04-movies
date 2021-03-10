import React from 'react';
import './MoviesPreview.scss';

const MoviesPreview = ({ title, name, poster }) => {
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={title}
        className="MoviesPreview__img"
      />
      <p>{title || name}</p>
    </>
  );
};

export default MoviesPreview;
