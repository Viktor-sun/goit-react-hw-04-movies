import React from 'react';

import './Cast.scss';

const Cast = ({ dataCast }) => (
  <>
    {dataCast.length === 0 && <h2>We do not have Cast</h2>}
    <ul className="Cast">
      {dataCast.length > 0 &&
        dataCast.map(({ id, name, character, profile_path }) => (
          <li key={id}>
            <h3>{name}</h3>
            <p>{character}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
            />
          </li>
        ))}
    </ul>
  </>
);

export default Cast;
