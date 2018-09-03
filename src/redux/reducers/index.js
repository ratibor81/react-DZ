import { combineReducers } from 'redux';
import itemsReducer from './movie-list';
import filterReducer from './filter';
import session from './session';

const rootReducer = combineReducers({
  movies: itemsReducer,
  filter: filterReducer,
  userSession: session,
});

export default rootReducer;
