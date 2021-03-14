import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import TitleOnError from '../components/TitleOnError';
import MoviesList from '../components/MoviesList';
import LoadMoreButton from '../components/LoadMoreButton';
import * as api from '../service/api-movies';
import '../styles/HomeView.scss';

class HomeView extends Component {
  state = {
    moviesArr: [],
    error: null,
    isLoading: false,
    currentPage: 1,
    totalMovies: null,
  };

  componentDidMount() {
    this.fetchAndSetStateMovies();
  }

  fetchAndSetStateMovies = () => {
    const { currentPage } = this.state;
    this.setState({ isLoading: true });

    api
      .fetchPopularMovies(currentPage)
      .then(data => {
        this.setState(prevState => ({
          moviesArr: [...prevState.moviesArr, ...data.results],
          currentPage: prevState.currentPage + 1,
          totalMovies: data.total_results,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { moviesArr, error, isLoading, totalMovies } = this.state;

    const shouldRenderLoadMoreButton =
      !isLoading && moviesArr.length !== totalMovies;

    return (
      <>
        {error && <TitleOnError />}
        <h1 className="HeroTitle">Welcome!</h1>

        <MoviesList movies={moviesArr} />

        {shouldRenderLoadMoreButton && (
          <LoadMoreButton handleOnClick={this.fetchAndSetStateMovies} />
        )}

        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#56b5b8"
            height={50}
            width={80}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        )}
      </>
    );
  }
}

export default HomeView;
