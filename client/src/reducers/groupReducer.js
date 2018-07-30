import {
  GET_CURRENT_GROUP,
  GROUP_LOADING,
  DELETE_MEMBER
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
    case DELETE_MEMBER:
      return {
        ...state,
        group: {
          ...state.group,

        }
      }

    default:
      return state
  }
}