import fetchMovies from '@services/get-movies';
import searchMovie from '@services/search';
import getMoviesByGenreId from '@services/get-by-genre';
import {
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SET_FROM_DATABASE,
  FETCH_MORE_MOVIES,
  SEARCH_MOVIES,
  SEARCH_MORE_MOVIES,
  SET_MOVIE_TITLE,
  SET_MOVIE_GENRE,
  GET_MOVIES_BY_GENRE,
  GET_MORE_MOVIES_BY_GENRE,
  ERROR_RESET,
} from './types';

export const errorReset = reset => ({
  type: ERROR_RESET,
  payload: reset,
});

export const setFromDatabase = watchlist => ({
  type: SET_FROM_DATABASE,
  payload: watchlist,
});

export const addToWatchlist = movie => ({
  type: ADD_TO_WATCHLIST,
  payload: movie,
});

export const removeFromWatchlist = id => ({
  type: REMOVE_FROM_WATCHLIST,
  payload: id,
});

const fetchMoviesSuccess = movies => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});

const fetchMoreMovies = movies => ({
  type: FETCH_MORE_MOVIES,
  payload: movies,
});

const fetchMoviesFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});
const searchMoviesSuccess = movies => ({
  type: SEARCH_MOVIES,
  payload: movies,
});
const searchMoreMovies = movies => ({
  type: SEARCH_MORE_MOVIES,
  payload: movies,
});

export const setMovieTitle = title => ({
  type: SET_MOVIE_TITLE,
  payload: title,
});
export const setMovieGenre = id => ({
  type: SET_MOVIE_GENRE,
  payload: id,
});
const getByGenre = movies => ({
  type: GET_MOVIES_BY_GENRE,
  payload: movies,
});
const getMoreByGenre = movies => ({
  type: GET_MORE_MOVIES_BY_GENRE,
  payload: movies,
});

export const getMovies = pageNum => dispatch => {
  fetchMovies(pageNum)
    .then(movies => dispatch(fetchMoviesSuccess(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};

export const getMoreMovies = pageNum => dispatch => {
  fetchMovies(pageNum)
    .then(movies => dispatch(fetchMoreMovies(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};

export const getMovieByTitle = title => dispatch => {
  searchMovie(title)
    .then(movies => dispatch(searchMoviesSuccess(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};

export const getMoreMoviesByTitle = title => dispatch => {
  searchMovie(title)
    .then(movies => dispatch(searchMoreMovies(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
export const getMoviesByGenre = genre => dispatch => {
  getMoviesByGenreId(genre)
    .then(movies => dispatch(getByGenre(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
export const getMoreMoviesByGenre = genre => dispatch => {
  getMoviesByGenreId(genre)
    .then(movies => dispatch(getMoreByGenre(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
