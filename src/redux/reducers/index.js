import { combineReducers } from 'redux';
import itemsReducer from './movie-list';

const rootReducer = combineReducers({
  movies: itemsReducer,
});

export default rootReducer;
