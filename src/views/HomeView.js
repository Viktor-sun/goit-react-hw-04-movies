import React, { Component } from 'react';
import TitleOnError from '../components/TitleOnError';
import MoviesList from '../components/MoviesList';
import * as api from '../service/api-movies';
import '../styles/HomeView.scss';

class HomeView extends Component {
  state = {
    moviesArr: [],
    error: null,
  };

  componentDidMount() {
    this.fetchAndSetStateMovies();
  }

  fetchAndSetStateMovies = () => {
    api
      .fetchPopularMovies()
      .then(data => {
        this.setState({ moviesArr: data.results });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { moviesArr, error } = this.state;

    return (
      <>
        {error && <TitleOnError />}
        <h1 className="HeroTitle">Welcome!</h1>
        <MoviesList movies={moviesArr} />
      </>
    );
  }
}

export default HomeView;
