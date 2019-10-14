import React, {useEffect, useState} from 'react';
import {logoutUser} from '../actions/authentication';
import {connect} from 'react-redux';
import TaskList from './TaskList';
import Form from './Form';
import {getTasks, addTask} from '../actions/task';
import Loader from './Loader';
import socketIOClient from 'socket.io-client';

const Main = ({tasks, logoutUser, history, user, getTasks, addTask}) => {
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState({});
  useEffect(() => {
    setLoading(true);
    getTasks(user.email);
    const socketClient = socketIOClient('http://localhost:5000');
    setSocket(socketClient);
    socketClient.emit('setEmail', user.email);
    socketClient.on('addTask', obj => {
      addTask(obj.title, obj.user, obj.from);
    })
  }, []);

  useEffect(() => {
    if(loading) setLoading(false)
  }, [tasks])

  return(
    <div className="main-container">
      <div className="main-header bg-info p-3">
        <button className="btn bg-danger btn-sm logout-btn text-white" onClick={() => logoutUser(history)}>Logout</button>
        <h4 className="text-center">Task Manager</h4>
        <h5 className="text-center">{user.firstName} {user.lastName}</h5>
        <p>All tasks: {tasks.length}</p>
        <p>Completed: {tasks.filter(item => item.completed === true).length}</p>
        <p>Remains: {tasks.filter(item => item.completed === false).length}</p>
      </div>
      <Form />
      <div className="main-content p-3">
        {loading && <Loader />}
        <TaskList 
          tasks={tasks} 
          loading={loading} 
          socket={socket} 
        />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    tasks: state.tasks,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, {logoutUser, getTasks, addTask})(Main);