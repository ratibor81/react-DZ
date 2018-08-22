import { createSelector } from 'reselect';

export const getAllMovies = state => state.movies.items;

export const getWatchlist = state => state.movies.watchlist;

export const getCurrentFilter = state => state.filter;

export const getMoviesWithCurrentGenre = createSelector(
  [getAllMovies, getCurrentFilter],
  (movies, filter) =>
    filter === 10101010
      ? movies
      : movies.filter(movie => movie.genre_ids.includes(filter)),
);