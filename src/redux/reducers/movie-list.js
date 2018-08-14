import {
  FETCH_MOVIES_SUCCESS,
  REMOVE_FROM_WATCHLIST,
  ADD_TO_WATCHLIST,
} from '../types';

const initialStore = {
  items: [],
  watchlist: [],
};

const itemsReducer = (state = initialStore, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        items: payload,
      };
    case ADD_TO_WATCHLIST: {
      const duplicateMovie = state.watchlist.find(
        movie => movie.id === payload,
      );
      if (duplicateMovie) return state;
      return {
        ...state,
        watchlist: [
          state.items.find(movie => movie.id === payload),
          ...state.watchlist,
        ],
      };
    }
    case REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter(movie => movie.id !== payload),
      };
    default:
      return state;
  }
};

export default itemsReducer;
