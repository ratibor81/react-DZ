import { FETCH_MOVIES_FAILURE, ERROR_RESET } from '../types';

const resetState = null;
const errorReducer = (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_FAILURE:
      return payload;
    case ERROR_RESET:
      return resetState;
    default:
      return state;
  }
};

export default errorReducer;
