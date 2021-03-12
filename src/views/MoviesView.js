import React, { Component } from 'react';
import queryString from 'query-string';
import Loader from 'react-loader-spinner';
import TitleOnError from '../components/TitleOnError';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';
import * as api from '../service/api-movies';

class MoviesView extends Component {
  state = {
    searchMoviesArr: [],
    error: null,
    isLoading: false,
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
      this.fetchAndSetStateMoves(nextQuery);
    }
  }

  parseQueryFromProps = props => queryString.parse(props.location.search);

  fetchAndSetStateMoves = query => {
    this.setState({ isLoading: true });

    api
      .fetchSearchMovies(query)
      .then(data => {
        this.setState({ searchMoviesArr: data.results });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  formSubmit = searchQuery => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${searchQuery}`,
    });
  };

  render() {
    const { searchMoviesArr, error, isLoading } = this.state;

    return (
      <>
        {error && <TitleOnError />}
        <SearchForm submit={this.formSubmit} />

        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#56b5b8"
            height={50}
            width={80}
            style={{ display: 'flex', justifyContent: 'center' }}
          />
        )}

        <MoviesList movies={searchMoviesArr} />
      </>
    );
  }
}

export default MoviesView;
