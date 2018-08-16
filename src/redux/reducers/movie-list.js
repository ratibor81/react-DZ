import {
  FETCH_MOVIES_SUCCESS,
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
  SET_FROM_LOCALSTORAGE,
  FETCH_MORE_MOVIES,
} from '../types';

const initialStore = {
  items: [],
  watchlist: [],
};

const itemsReducer = (state = initialStore, { type, payload }) => {
  switch (type) {
    case FETCH_MORE_MOVIES:
      return {
        ...state,
        items: state.items.concat(payload),
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        items: payload,
      };
    case ADD_TO_WATCHLIST: {
      return {
        ...state,
        watchlist: [payload, ...state.watchlist],
      };
    }
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.id !== payload),
      };
    case SET_FROM_LOCALSTORAGE:
      return {
        ...state,
        watchlist: payload,
      };
    default:
      return state;
  }
};

export default itemsReducer;
