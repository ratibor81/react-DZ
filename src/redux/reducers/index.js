import { combineReducers } from 'redux';
import itemsReducer from './movie-list';
import filterReducer from './filter';

const rootReducer = combineReducers({
  movies: itemsReducer,
  filter: filterReducer,
});

export default rootReducer;
