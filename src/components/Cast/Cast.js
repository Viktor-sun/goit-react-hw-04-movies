import React from 'react';
import PropTypes from 'prop-types';

import './Cast.scss';

const Cast = ({ dataCast }) => {
  return (
    <>
      {dataCast.length === 0 && <h2>We do not have Cast</h2>}
      <ul className="Cast">
        {dataCast.length > 0 &&
          dataCast.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  !profile_path
                    ? '/tcTImfddyFXeR3FlJsaRg81tCuz.png'
                    : profile_path
                }`}
                alt={name}
              />
              <h3>{name}</h3>
              <p>{character}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

Cast.propTypes = {
  dataCast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
      character: PropTypes.string,
    }),
  ).isRequired,
};

export default Cast;
