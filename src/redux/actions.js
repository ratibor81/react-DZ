import {
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SET_FROM_DATABASE,
  FETCH_MORE_MOVIES,
  SEARCH_MOVIES,
  SEARCH_MORE_MOVIES,
  SET_MOVIE_TITLE,
} from './types';
import fetchMovies from '../services/get-movies';
import searchMovie from '../services/search';

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

const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
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

export const getMovies = category => dispatch => {
  dispatch(fetchMoviesRequest());

  fetchMovies(category)
    .then(movies => dispatch(fetchMoviesSuccess(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};

export const getMoreMovies = category => dispatch => {
  dispatch(fetchMoviesRequest());

  fetchMovies(category)
    .then(movies => dispatch(fetchMoreMovies(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};

export const getMovieByTitle = title => dispatch => {
  dispatch(fetchMoviesRequest());

  searchMovie(title)
    .then(movies => dispatch(searchMoviesSuccess(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};

export const getMoreMoviesByTitle = title => dispatch => {
  dispatch(fetchMoviesRequest());

  searchMovie(title)
    .then(movies => dispatch(searchMoreMovies(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
