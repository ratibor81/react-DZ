import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import persistDataLocally from './middlewares/local-storage';

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, persistDataLocally),
);
const store = createStore(rootReducer, enhancer);

export default store;
