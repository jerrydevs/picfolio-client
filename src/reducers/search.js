import {
  GET_SEARCH,
  SEARCH_ERROR
} from '../actions/types';

const initialState = {
  usersFound: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  
  switch (type) {
    case GET_SEARCH:
      return {
        ...state,
        usersFound: payload,
        loading: false
      }
      case SEARCH_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        }
      default:
        return state;
    }
}