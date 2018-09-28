import getActors from '@services/get-actors';
import getImages from '@services/get-images';
import getVideos from '@services/get-videos';
import searchById from '@services/search-by-id';

import {
  GET_MOVIE_BY_ID,
  GET_MOVIE_IMAGES,
  GET_MOVIE_ACTORS,
  GET_MOVIE_TRAILER,
  FETCH_MOVIES_FAILURE,
} from './types';

const fetchMoviesFailure = error => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});

const getMovie = movie => ({
  type: GET_MOVIE_BY_ID,
  payload: movie,
});
const getImage = images => ({
  type: GET_MOVIE_IMAGES,
  payload: images,
});
const getActor = actors => ({
  type: GET_MOVIE_ACTORS,
  payload: actors,
});
const getTrailer = vid => ({
  type: GET_MOVIE_TRAILER,
  payload: vid,
});

export const getMovieById = movieId => dispatch => {
  searchById(movieId)
    .then(movie => dispatch(getMovie(movie)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
export const getMovieImages = movieId => dispatch => {
  getImages(movieId)
    .then(images => dispatch(getImage(images)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
export const getMovieActors = movieId => dispatch => {
  getActors(movieId)
    .then(actors => dispatch(getActor(actors)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
export const getMovieTrailer = movieId => dispatch => {
  getVideos(movieId)
    .then(trailer => dispatch(getTrailer(trailer)))
    .catch(err => dispatch(fetchMoviesFailure(err)));
};
