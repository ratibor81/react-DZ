import { combineReducers } from 'redux';
import {
  FETCH_MOVIES_SUCCESS,
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
  SET_FROM_LOCALSTORAGE,
  FETCH_MORE_MOVIES,
} from '../types';

const items = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_MORE_MOVIES:
      return state.concat(payload);
    case FETCH_MOVIES_SUCCESS:
      return payload;
    default:
      return state;
  }
};

const watchlist = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_TO_WATCHLIST:
      return [payload, ...state];
    case REMOVE_FROM_WATCHLIST:
      return state.filter(movie => movie.id !== payload);
    case SET_FROM_LOCALSTORAGE:
      return payload;
    default:
      return state;
  }
};

export default combineReducers({
  items,
  watchlist,
});
