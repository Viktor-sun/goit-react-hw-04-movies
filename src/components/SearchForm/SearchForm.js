import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchForm.scss';

class SearchForm extends Component {
  static propTypes = {
    submit: PropTypes.func.isRequired,
  };

  state = { query: '' };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={this.handleChange}
          value={query}
        />

        <button type="submit" className="SearchForm-button">
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
