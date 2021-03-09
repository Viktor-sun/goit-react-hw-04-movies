import React, { Component } from 'react';
import * as api from '../../service/api-movies';
import './Cast.scss';

class Cast extends Component {
  state = {
    dataCast: [],
  };

  componentDidMount() {
    api
      .fetchInfoByCast('527774')
      .then(d => this.setState({ dataCast: d.cast }));
  }

  render() {
    const { dataCast } = this.state;

    return (
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
    );
  }
}

export default Cast;
