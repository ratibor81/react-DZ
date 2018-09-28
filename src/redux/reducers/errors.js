import { FETCH_MOVIES_FAILURE } from '../types';

const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_FAILURE:
      return payload;
    default:
      return state;
  }
};

export default errorReducer;
