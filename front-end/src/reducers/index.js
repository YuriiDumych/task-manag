import {combineReducers} from 'redux'
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  tasks: taskReducer,
  users: userReducer
})