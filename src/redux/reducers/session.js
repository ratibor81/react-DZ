import { combineReducers } from 'redux';
import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT,
} from '../types';

// const initialState = {
//   user: {
//     name: null,
//     email: null,
//   },
//   authenticated: false,
//   authenticating: false,
//   token: null,
//   error: null,
// };

function user(state = { name: null, email: null }, { type, payload }) {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return payload.user;

    case SIGN_OUT:
      return {
        name: null,
        email: null,
      };

    default:
      return state;
  }
}

function authenticated(state = false, { type }) {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return true;

    case SIGN_OUT:
      return false;

    default:
      return state;
  }
}

function authenticating(state = false, { type }) {
  switch (type) {
    case SIGN_IN_REQUEST:
      return true;

    case SIGN_IN_SUCCESS:
    case SIGN_IN_FAILURE:
      return false;

    default:
      return state;
  }
}

function token(state = null, { type, payload }) {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return payload.token;

    case SIGN_OUT:
      return null;

    default:
      return state;
  }
}

function error(state = null, { type, payload }) {
  switch (type) {
    case SIGN_IN_FAILURE:
      return payload;

    case SIGN_IN_REQUEST:
    case SIGN_IN_SUCCESS:
    case SIGN_OUT:
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  user,
  authenticated,
  authenticating,
  token,
  error,
});
