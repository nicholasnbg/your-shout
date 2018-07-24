import axios from 'axios';
import {
  GET_CURRENT_GROUP,
  GROUP_LOADING
} from '../actions/types';

//Get Current Group Info
export const getGroupInfo = (groupId) => dispatch => {
  dispatch(setGroupLoading());
  axios.get(`/api/groups/${groupId}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_GROUP,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_CURRENT_GROUP,
        payload: null
      })
    )
}




//Set loading to true
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  }
}