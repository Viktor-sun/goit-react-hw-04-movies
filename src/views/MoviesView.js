import React, { Component } from 'react';
import queryString from 'query-string';
import * as api from '../service/api-movies';
import TitleOnError from '../components/TitleOnError';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';

class MoviesView extends Component {
  state = {
    searchMoviesArr: [],
    error: null,
  };

  componentDidMount() {
    const query = this.parseQueryFromProps(this.props).query;

    if (query) {
      api
        .fetchSearchMovies(query)
        .then(data => {
          this.setState({ searchMoviesArr: data.results });
        })
        .catch(error => this.setState({ error }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = this.parseQueryFromProps(prevProps).query;
    const nextQuery = this.parseQueryFromProps(this.props).query;

    if (prevQuery !== nextQuery) {
      api
        .fetchSearchMovies(nextQuery)
        .then(data => {
          this.setState({ searchMoviesArr: data.results });
        })
        .catch(error => this.setState({ error }));
    }
  }

  formSubmit = searchQuery => {
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `query=${searchQuery}`,
    });
  };

  parseQueryFromProps = props => queryString.parse(props.location.search);

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
