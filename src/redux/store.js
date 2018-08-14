import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistedState = localStorage.getItem('Watchlist')
  ? {
      movies: {
        items: [],
        watchlist: JSON.parse(localStorage.getItem('Watchlist')),
      },
    }
  : {};

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(() => {
  localStorage.setItem(
    'Watchlist',
    JSON.stringify(store.getState().movies.watchlist),
  );
});

export default store;
