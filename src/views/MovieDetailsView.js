import React, { Component, lazy } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import TitleOnError from '../components/TitleOnError';
import MovieDetails from '../components/MovieDetails';
import BackButton from '../components/BackButton';
import * as api from '../service/api-movies';
import routes from '../routes';
import '../styles/MovieDetailsView.scss';

const Cast = lazy(() =>
  import('../components/Cast' /* webpackChunkName: "cast-component" */),
);

const Reviews = lazy(() =>
  import('../components/Reviews' /* webpackChunkName: "reviews-component" */),
);

class MovieDetailsView extends Component {
  state = {
    InfoByMovies: {},
    cast: [],
    reviews: [],

    isLoading: false,
    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    this.fetchAndSetStateAllInfo(movieId);
  }

  fetchAndSetStateAllInfo = id => {
    this.setState({ isLoading: true });

    api
      .fetchInfoByMovies(id)
      .then(data => this.setState({ InfoByMovies: data }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));

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
    const { InfoByMovies, cast, reviews, error, isLoading } = this.state;

    const { match, location } = this.props;

    return (
      <>
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#56b5b8"
            height={50}
            width={80}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
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
      </>
    );
  }
}

export default MovieDetailsView;
