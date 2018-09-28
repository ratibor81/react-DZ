import { db, auth } from '@firebase-modules';

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
};

export default databaseUpdate;
