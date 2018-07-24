import {
  GET_CURRENT_GROUP,
  GROUP_LOADING
} from '../actions/types';

const initialState = {
  group: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GROUP_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_CURRENT_GROUP:
      return {
        group: action.payload,
        loading: false
      }

    default:
      return state
  }
}