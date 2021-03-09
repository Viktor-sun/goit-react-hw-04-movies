import React, { Component } from 'react';
import * as api from '../../service/api-movies';

class Reviews extends Component {
  state = {
    dataReviews: [],
  };

  componentDidMount() {
    api
      .fetchReviews('527774')
      .then(({ results }) => this.setState({ dataReviews: results }));
  }

  render() {
    const { dataReviews } = this.state;

    return (
      <ul>
        {dataReviews.map(({ id, author, content }) => (
          <li key={id}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Reviews;
