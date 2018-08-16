const persistDataLocally = store => next => action => {
  next(action);
  localStorage.watchlist = JSON.stringify(store.getState().movies.watchlist);
};

export default persistDataLocally;
