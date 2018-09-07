import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyC4wdR82vnMNXYwb10eJ8Col_HSb56CWdo',
  authDomain: 'movies-3d1df.firebaseapp.com',
  databaseURL: 'https://movies-3d1df.firebaseio.com',
  projectId: 'movies-3d1df',
  storageBucket: 'movies-3d1df.appspot.com',
  messagingSenderId: '759805419566',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };
