import { REMOVE_FROM_WATCHLIST, ADD_TO_WATCHLIST } from '../types';

const watchlistReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_TO_WATCHLIST:
      return [...state, payload];
    case REMOVE_FROM_WATCHLIST:
      return state.filter(movie => movie.id !== payload);
    default:
      return state;
  }
};

export default watchlistReducer;
