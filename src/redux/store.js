import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import databaseUpdate from './middlewares/database-storage';

const enhancer = composeWithDevTools(applyMiddleware(thunk, databaseUpdate));
const store = createStore(rootReducer, enhancer);

export default store;
