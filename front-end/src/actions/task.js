import {ADD_TASK, DELETE_TASK, EDIT_TASK, CHECK_TASK, GET_TASKS, GET_USERS} from './types';
import axios from 'axios';

export const addTask = (title, user, from) => dispatch => {
  if(!from){
    axios.post('/api/task/add', {data: {title, user}})
    .then(task => {
      dispatch({
        type: ADD_TASK,
        payload: task.data
      })
    })
  } else {
    dispatch({
      type: ADD_TASK,
      payload: {
        title,
        user,
        from,
        completed: false
      }
    })
  }
}

export const deleteTask = task => dispatch => {
  axios.delete('/api/task/delete', {data: {id: task._id}})
    .then(res => {
      dispatch({
        type: DELETE_TASK,
        payload: res.data._id
      })
    })
}

export const checkTask = task => dispatch => {
  const id = task._id;
  axios.put('/api/task/check', {data: {task}})
    .then(res => {
      dispatch({
        type: CHECK_TASK,
        payload: {id}
      })
    })
}

export const editTask = (id, title) => dispatch => {
  axios.put('/api/task/edit', {data: {id, title}})
    .then(task => {
      dispatch({
        type: EDIT_TASK,
        payload: {id, title}
      })
    })
}

export const getTasks = email => dispatch => {
  axios.post('/api/task/all', {data: {email}})
    .then(tasks => {
      dispatch({
        type: GET_TASKS,
        payload: tasks.data
      })
    })
}

export const getUsers = () => dispatch => {
  axios.get('/api/users/all')
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    })
}

export const shareTask = (from, to, title) => dispatch => {
  axios.post('/api/task/share', {data: {from, to, title}})
}