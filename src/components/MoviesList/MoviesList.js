import React from 'react';
import { NavLink } from 'react-router-dom';
import './MoviesList.scss';

const MoviesList = ({ movies }) => (
  <ul className="MoviesList">
    {movies &&
      movies.map(({ id, poster_path, title, name }) => (
        <li key={id} className="MoviesList__item">
          <NavLink to={`movies/${id}`} className="MoviesList__link">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              className="MoviesList__img"
            />
            <p>{title || name}</p>
          </NavLink>
        </li>
      ))}
  </ul>
);

export default MoviesList;
