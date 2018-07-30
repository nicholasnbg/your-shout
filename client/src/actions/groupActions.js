import axios from 'axios';
import {
  GET_CURRENT_GROUP,
  GROUP_LOADING,
  GET_ERRORS,
  DELETE_MEMBER
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

// Add member to group
export const addMember = (memberEmail, groupId) => dispatch => {
  axios.post(`/api/groups/${groupId}/adduser/${memberEmail}`)
    // .then(res => history.push(`/group/${groupId}`))
    .then(res => dispatch(getGroupInfo(groupId)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

//Remove member from group
export const removeMember = (userId, groupId) => dispatch => {
  console.log('in removerMember action')
  axios.delete(`/api/groups/${groupId}/removeuser/${userId}`)
    .then(res => dispatch({
      type: DELETE_MEMBER,
      payload: {
        userId,
        groupId
      }
    }))
    .then(res => dispatch(getGroupInfo(groupId)))
    .catch(err => console.log(err))
}




//Set loading to true
export const setGroupLoading = () => {
  return {
    type: GROUP_LOADING
  }
}