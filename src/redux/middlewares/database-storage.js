import { db, auth } from '../../firebase';

const databaseUpdate = store => next => action => {
  next(action);
  const userId = auth.currentUser().uid;
  const list = store.getState().movies.watchlist;
  const username = {
    watchlist: list,
  };
  db.updateUser(username, userId);
  // localStorage.watchlist = JSON.stringify(store.getState().movies.watchlist);
};

export default databaseUpdate;
