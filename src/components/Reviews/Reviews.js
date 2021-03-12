import React from 'react';
import PropTypes from 'prop-types';

const Reviews = ({ dataReviews }) => (
  <>
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

Reviews.propTypes = {
  dataReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string,
      content: PropTypes.string,
    }),
  ).isRequired,
};

export default Reviews;
