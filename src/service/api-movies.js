import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWU4YTM1NmE4MjE3ZDgyM2Q4MTRlZGFhY2ViNjJmYiIsInN1YiI6IjYwMTAwMTY3YjJlMDc0MDAzZjBhNGY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a1RnNSBZJWsTzFEhbSbIMfsNxSRWL6flGymQDpaEpFc';

const fetchPopularMovies = page =>
  axios.get(`/trending/all/day?page=${page}`).then(res => res.data);

const fetchSearchMovies = (query, page) =>
  axios.get(`/search/movie?query=${query}&page=${page}`).then(res => res.data);

const fetchInfoByMovies = movieId =>
  axios.get(`/movie/${movieId}`).then(res => res.data);

const fetchInfoByCast = castId =>
  axios.get(`/movie/${castId}/credits`).then(res => res.data);

const fetchReviews = id =>
  axios.get(`/movie/${id}/reviews`).then(res => res.data);

export {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchInfoByMovies,
  fetchInfoByCast,
  fetchReviews,
};
