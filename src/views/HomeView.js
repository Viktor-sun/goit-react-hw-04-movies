import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import TitleOnError from '../components/TitleOnError';
import MoviesList from '../components/MoviesList';
import * as api from '../service/api-movies';
import '../styles/HomeView.scss';

class HomeView extends Component {
  state = {
    moviesArr: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.fetchAndSetStateMovies();
  }

  fetchAndSetStateMovies = () => {
    this.setState({ isLoading: true });

    api
      .fetchPopularMovies()
      .then(data => {
        this.setState({ moviesArr: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { moviesArr, error, isLoading } = this.state;

    return (
      <>
        {error && <TitleOnError />}
        <h1 className="HeroTitle">Welcome!</h1>
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#56b5b8"
            height={50}
            width={80}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
        <MoviesList movies={moviesArr} />
      </>
    );
  }
}

export default HomeView;
