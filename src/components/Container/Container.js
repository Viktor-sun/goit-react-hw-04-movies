import React, { Component } from 'react';
import axios from 'axios';

class Container extends Component {
  state = {
    img: null,
  };

  componentDidMount() {
    axios
      .get(
        'https://api.themoviedb.org/3/trending/all/day?api_key=9ee8a356a8217d823d814edaaceb62fb',
      )

      .then(res => {
        this.setState({ img: res.data.results });
      });
  }

  render() {
    return (
      <ul>
        {this.state.img &&
          this.state.img.map(i => (
            <li key={i.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${i.poster_path}`}
                alt=""
              />
            </li>
          ))}
      </ul>
    );
  }
}

export default Container;
