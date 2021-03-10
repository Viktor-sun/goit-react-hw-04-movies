import React, { Component } from 'react';
import TitleOnError from '../TitleOnError';
import * as api from '../../service/api-movies';

class Reviews extends Component {
  state = {
    dataReviews: [],
    error: null,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;

    api
      .fetchReviews(movieId)
      .then(({ results }) => this.setState({ dataReviews: results }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { dataReviews, error } = this.state;

    return (
      <>
        {error && <TitleOnError />}
        {dataReviews.length === 0 && <h2>We do not have Reviews</h2>}
        {dataReviews && (
          <ul>
            {dataReviews.map(({ id, author, content }) => (
              <li key={id}>
                <h3>Author: {author}</h3>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default Reviews;
