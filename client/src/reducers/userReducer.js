import {
  GET_CURRENT_USER,
  USER_LOADING
} from '../actions/types';

const initialState = {
  userInfo: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_CURRENT_USER:
      return {
        userInfo: action.payload,
        loading: false
      }
    default:
      return state

  }
}