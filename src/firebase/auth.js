import { auth } from './firebase';

// Sign out

export const doSignOut = () => auth.signOut();

// Password Change

export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);

export const currentUser = () => auth.currentUser;

// Check autorization with Google,Facebook,Twitter,Github

export const isAuth = () =>
  !!(currentUser().displayName && currentUser().photoURL);
