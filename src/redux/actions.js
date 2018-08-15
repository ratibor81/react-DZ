import {
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SET_FROM_LOCALSTORAGE,
  // FETCH_MORE_MOVIES,
} from './types';
import fetchMovies from '../services/get-movies';
import searchMovie from '../services/search';

export const setFromLocalStorage = watchlist => ({
  type: SET_FROM_LOCALSTORAGE,
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
// const fetchMoreMovies = movies => ({
//   type: FETCH_MORE_MOVIES,
//   payload: movies,
// });

const fetchMoviesFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

export const getMovies = category => dispatch => {
  dispatch(fetchMoviesRequest());

  fetchMovies(category)
    .then(movies => dispatch(fetchMoviesSuccess(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};

export const getMovieByTitle = title => dispatch => {
  dispatch(fetchMoviesRequest());

  searchMovie(title)
    .then(movies => dispatch(fetchMoviesSuccess(movies)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
