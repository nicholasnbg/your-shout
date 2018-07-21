import axios from 'axios';
import {
  GET_CURRENT_USER,
  USER_LOADING
} from '../actions/types';

//Get Current User Info
export const getUserInfo = (userId) => dispatch => {
  console.log('running getuserinfo')
  dispatch(setUserLoading());
  axios.get(`/api/users/${userId}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: null
      })
    )
}




//Set loading to true
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}