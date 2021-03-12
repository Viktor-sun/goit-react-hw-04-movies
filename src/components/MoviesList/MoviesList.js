import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MoviesPreview from '../MoviesPreview';
import './MoviesList.scss';

const MoviesList = ({ movies, location }) => (
  <ul className="MoviesList">
    {movies &&
      movies.map(({ id, poster_path, title, name }) => (
        <li key={id} className="MoviesList__item">
          <NavLink
            to={{
              pathname: `movies/${id}`,
              state: {
                from: location,
              },
            }}
            className="MoviesList__link"
          >
            <MoviesPreview title={title} name={name} poster={poster_path} />
          </NavLink>
        </li>
      ))}
  </ul>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default withRouter(MoviesList);
