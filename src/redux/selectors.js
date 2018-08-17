import { createSelector } from 'reselect';

const getAllMovies = state => state.movies.items;

const getWatchlist = state => state.movies.watchlist;

const getCurrentFilter = state => state.filter;

export const getMoviesWithCurrentGenre = createSelector(
  [getAllMovies, getCurrentFilter],
  (movies, filter) =>
    filter === 10101010
      ? movies
      : movies.filter(movie => movie.genre_ids.includes(filter)),
);

// export const getMoviesWithCurrentGenre = state => {
//   const currentGenre = getCurrentFilter(state);
//   const movies = getAllMovies(state);

//   return currentGenre === 10101010
//     ? movies
//     : movies.filter(movie => movie.genre_ids.includes(currentGenre));
// };

export { getAllMovies, getWatchlist, getCurrentFilter };
