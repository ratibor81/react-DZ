import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () => db.ref('users').once('value');

export const updateUser = (data, id) => db.ref(`users/${id}`).update(data);

export const getUserData = id => db.ref(`users/${id}`).once('value');

// Other Entity APIs ...
