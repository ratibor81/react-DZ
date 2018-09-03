import * as api from '../services/api';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
  SAVE_SESSION,
} from './types';

export const signUserUp = credentials =>
  // console.log(credentials);

  ({
    type: 'SIGN_UP',
    payload: credentials,
  });

const saveSession = () => ({ type: SAVE_SESSION });

export const signUserIn = credentials => dispatch => {
  dispatch({ type: SIGN_IN_REQUEST });

  api
    .signInWithEmailAndPassword(credentials)
    .then(response => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: response });
      dispatch(saveSession());
    })
    .catch(error => {
      dispatch({ type: SIGN_IN_FAILURE, payload: error });
    });
};

export const signUserOut = () => dispatch => {
  dispatch({ type: SIGN_OUT });
  dispatch(saveSession());
};
