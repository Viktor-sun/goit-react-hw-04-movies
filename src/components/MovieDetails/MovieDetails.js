import React from 'react';
import './MovieDetails.scss';

const MovieDetails = ({ info }) => {
  const {
    title,
    overview,
    genres,
    original_language,
    vote_average,
    homepage,
  } = info;

  return (
    <>
      <h2>{title}</h2>
      <p>{overview}</p>
      <ul className="MovieDetails__item">
        <li>{genres && genres.map(({ name }) => name).join(', ')}</li>
        <li>Original language: {original_language}</li>
        <li>User Score: {vote_average}</li>
        <li>
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            Homepage
          </a>
        </li>
      </ul>
    </>
  );
};

export default MovieDetails;
