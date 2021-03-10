import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import TitleOnError from '../components/TitleOnError';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import * as api from '../service/api-movies';
import '../styles/MovieDetailsView.scss';

class MovieDetailsView extends Component {
  state = {
    poster_path: null,
    title: null,
    overview: null,
    original_language: null,
    vote_average: null,
    genres: [],
    homepage: null,

    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    api
      .fetchInfoByMovies(movieId)
      .then(data => this.setState({ ...data }))
      .catch(error => this.setState({ error }));
  }

  getGenres = () => {
    const { genres } = this.state;
    if (genres) {
      return genres.map(({ name }) => name).join(', ');
    }
  };

  render() {
    const {
      poster_path,
      title,
      overview,
      original_language,
      vote_average,
      homepage,

      error,
    } = this.state;
    const genres = this.getGenres();

    return (
      <article className="MovieDetailsCard">
        {error && <TitleOnError />}
        <img
          src={poster_path && `https://image.tmdb.org/t/p/w780${poster_path}`}
          alt={title}
        />
        <div className="MovieDetails">
          <h2>{title}</h2>
          <p>{overview}</p>
          <ul>
            <li>{genres}</li>
            <li>Original language: {original_language}</li>
            <li>User Score: {vote_average}</li>
            <li>
              <a href={homepage} target="_blank" rel="noopener noreferrer">
                Homepage
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to={`${this.props.match.url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${this.props.match.url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>
          <Switch>
            <Route path={`${this.props.match.path}/cast`} component={Cast} />
            <Route
              path={`${this.props.match.path}/reviews`}
              component={Reviews}
            />
          </Switch>
        </div>
      </article>
    );
  }
}

export default MovieDetailsView;
