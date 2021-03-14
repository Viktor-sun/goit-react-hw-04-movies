import React, { Component } from 'react';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import TitleOnError from '../components/TitleOnError';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';
import LoadMoreButton from '../components/LoadMoreButton';
import * as api from '../service/api-movies';

class MoviesView extends Component {
  state = {
    searchMoviesArr: [],
    error: null,
    isLoading: false,
    currentPage: 1,
    totalMovies: null,
  };

  componentDidMount() {
    const searchQuery = this.parseQueryFromProps(this.props).query;

    if (searchQuery) {
      this.fetchAndSetStateMoves(searchQuery);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = this.parseQueryFromProps(prevProps).query;
    const nextQuery = this.parseQueryFromProps(this.props).query;

    if (prevQuery !== nextQuery) {
      if (nextQuery) {
        this.fetchAndSetStateMoves(nextQuery);
      } else {
        this.setState({ searchMoviesArr: [] });
      }
    }
  }

  parseQueryFromProps = props => queryString.parse(props.location.search);

  fetchAndSetStateMoves = query => {
    const { currentPage } = this.state;
    this.setState({ isLoading: true });

    api
      .fetchSearchMovies(query, currentPage)
      .then(data => {
        this.setState(prevState => ({
          searchMoviesArr: [...prevState.searchMoviesArr, ...data.results],
          currentPage: prevState.currentPage + 1,
          totalMovies: data.total_results,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  formSubmit = searchQuery => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${searchQuery}`,
    });
    this.setState({
      currentPage: 1,
      totalMovies: null,
      searchMoviesArr: [],
      error: null,
    });
  };

  onBtnLoadMore = () => {
    const searchQuery = this.parseQueryFromProps(this.props).query;
    this.fetchAndSetStateMoves(searchQuery);
  };

  render() {
    const { searchMoviesArr, error, isLoading, totalMovies } = this.state;
    const shouldRenderLoadMoreButton =
      !isLoading &&
      searchMoviesArr.length > 0 &&
      searchMoviesArr.length !== totalMovies;

    return (
      <>
        {error && <TitleOnError />}
        <SearchForm submit={this.formSubmit} />
        <MoviesList movies={searchMoviesArr} />

        {shouldRenderLoadMoreButton && (
          <LoadMoreButton handleOnClick={this.onBtnLoadMore} />
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

export default MoviesView;
