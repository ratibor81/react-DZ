import { db, auth } from '../../firebase';

const databaseUpdate = store => next => action => {
  if (!action.payload) return;
  next(action);
  if (!auth.currentUser()) return;

  const userId = auth.currentUser().uid;
  const list = store.getState().movies.watchlist;
  const username = {
    watchlist: list,
  };
  db.updateUser(username, userId);
  // localStorage.watchlist = JSON.stringify(store.getState().movies.watchlist);
};

export default databaseUpdate;
