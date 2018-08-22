import { CHANGE_FILTER } from '../types';

const intialState = 10101010;

export default function filterReducer(state = intialState, { type, payload }) {
  switch (type) {
    case CHANGE_FILTER:
      return +payload;

    default:
      return state;
  }
}
