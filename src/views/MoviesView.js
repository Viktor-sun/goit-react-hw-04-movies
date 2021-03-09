import React, { Component } from 'react';
import * as api from '../service/api-movies';
import TitleOnError from '../components/TitleOnError';
import SearchForm from '../components/SearchForm';
import MoviesList from '../components/MoviesList';

class MoviesView extends Component {
  state = {
    searchMoviesArr: [],
    error: null,
  };

  formSubmit = searchQuery => {
    api
      .fetchSearchMovies(searchQuery)
      .then(data => {
        this.setState({ searchMoviesArr: data.results });
      })
      .catch(error => this.setState({ error }));
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
