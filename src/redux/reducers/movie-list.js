import { FETCH_MOVIES_SUCCESS } from '../types';

const itemsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_MOVIES_SUCCESS:
      return payload;

    default:
      return state;
  }
};

export default itemsReducer;
