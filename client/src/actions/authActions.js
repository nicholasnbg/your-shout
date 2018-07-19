import axios from "axios";
import {
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken';

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Log user in
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      //Save to local storage
      const {
        token
      } = res.data;
      // Set token to local storage
      localStorage.setItem('jwttoken', token);
      //Set auth to header
      setAuthToken(token);
      //  Decode to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove the auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will also set isAuthenticat to false
  dispatch(setCurrentUser({}));
}