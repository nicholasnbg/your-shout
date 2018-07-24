import {
  combineReducers
} from 'redux';
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import userReducer from './userReducer'
import groupReducer from './groupReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  user: userReducer,
  group: groupReducer
})