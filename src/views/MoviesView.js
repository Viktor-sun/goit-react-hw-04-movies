import React, { Component } from 'react';
import queryString from 'query-string';
import TitleOnError from '../components/TitleOnError';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';
import * as api from '../service/api-movies';

class MoviesView extends Component {
  state = {
    searchMoviesArr: [],
    error: null,
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
    api
      .fetchSearchMovies(query)
      .then(data => {
        this.setState({ searchMoviesArr: data.results });
      })
      .catch(error => this.setState({ error }));
  };

  formSubmit = searchQuery => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${searchQuery}`,
    });
  };

  render() {
    const { searchMoviesArr, error } = this.state;

    return (
      <>
        {error && <TitleOnError />}
        <SearchForm submit={this.formSubmit} />

        <MoviesList movies={searchMoviesArr} />
      </>
    );
  }
}

export default MoviesView;
