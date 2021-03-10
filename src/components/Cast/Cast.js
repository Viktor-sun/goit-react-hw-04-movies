import React, { Component } from 'react';
import TitleOnError from '../TitleOnError';
import * as api from '../../service/api-movies';

import './Cast.scss';

class Cast extends Component {
  state = {
    dataCast: [],
    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    api
      .fetchInfoByCast(movieId)
      .then(d => this.setState({ dataCast: d.cast }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { dataCast, error } = this.state;

    return (
      <>
        {error && <TitleOnError />}
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
  }
}

export default Cast;
