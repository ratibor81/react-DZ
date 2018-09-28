import { combineReducers } from 'redux';
import itemsReducer from './movie-list';
import errorReducer from './errors';

const rootReducer = combineReducers({
  movies: itemsReducer,
  errors: errorReducer,
});

export default rootReducer;
