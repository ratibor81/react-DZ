import { combineReducers } from 'redux';
// import watchlistReducer from './watchlist';
import itemsReducer from './movie-list';

const rootReducer = combineReducers({
  movies: itemsReducer,
});

export default rootReducer;
