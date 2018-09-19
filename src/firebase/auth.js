import { auth } from './firebase';

// Sign out

export const doSignOut = () => auth.signOut();

// Password Change

export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);

export const currentUser = () => auth.currentUser;

// Autorized with Google,Facebook,Twitter user check

export const isAuth = () =>
  currentUser() && currentUser().displayName && currentUser().photoURL;
