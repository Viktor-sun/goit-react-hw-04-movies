import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import TitleOnError from '../components/TitleOnError';
import Cast from '../components/Cast';
import Reviews from '../components/Reviews';
import MovieDetails from '../components/MovieDetails';
import BackButton from '../components/BackButton';
import * as api from '../service/api-movies';
import routes from '../routes';
import '../styles/MovieDetailsView.scss';

class MovieDetailsView extends Component {
  state = {
    InfoByMovies: {},
    cast: [],
    reviews: [],

    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    this.fetchAndSetStateAllInfo(movieId);
  }

  fetchAndSetStateAllInfo = id => {
    api
      .fetchInfoByMovies(id)
      .then(data => this.setState({ InfoByMovies: data }))
      .catch(error => this.setState({ error }));

    api
      .fetchInfoByCast(id)
      .then(({ cast }) => this.setState({ cast }))
      .catch(error => this.setState({ error }));

    api
      .fetchReviews(id)
      .then(({ results }) => this.setState({ reviews: results }))
      .catch(error => this.setState({ error }));
  };

  handleGoBack = () => {
    const { location, history } = this.props;

    if (location.state && location.state.from) {
      history.push(location.state.from);
      return;
    }

    history.push(routes.home);

    // history.push(location?.state?.from || routes.home);
  };

  render() {
    const { InfoByMovies, cast, reviews, error } = this.state;

    const { match, location } = this.props;

    return (
      <section className="MovieDetailsCard">
        {error && <TitleOnError />}
        <BackButton onBack={this.handleGoBack} />

        <img
          src={
            InfoByMovies.poster_path &&
            `https://image.tmdb.org/t/p/w780${InfoByMovies.poster_path}`
          }
          alt={InfoByMovies.title}
        />
        <div className="MovieDetailsWrapper">
          <MovieDetails info={InfoByMovies} />

          <ul>
            <li>
              <NavLink
                to={{
                  pathname: `${match.url}/cast`,
                  state: {
                    from:
                      location.state && location.state.from
                        ? location.state.from
                        : null,
                  },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${match.url}/reviews`,
                  state: {
                    from:
                      location.state && location.state.from
                        ? location.state.from
                        : null,
                  },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          <Switch>
            <Route
              path={`${match.path}/cast`}
              render={props => <Cast {...props} dataCast={cast} />}
            />
            <Route
              path={`${match.path}/reviews`}
              render={props => <Reviews {...props} dataReviews={reviews} />}
            />
          </Switch>
        </div>
      </section>
    );
  }
}

export default MovieDetailsView;
