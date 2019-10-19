import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react';
import { faPen, faCheck, faWindowClose, faShare } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames';
import {connect} from 'react-redux';
import {deleteTask, checkTask, editTask, getUsers, shareTask} from '../actions/task';


const TaskItem = ({item, socket, deleteTask, checkTask, editTask, getUsers, shareTask, users}) => {

  const [edit, changeEdit] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [share, setShare] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if(item.title !== title){
      editTask(item._id, title);
    } 
    changeEdit(false)
  }

  const handleShare = event => {
    event.preventDefault();
    const value = event.target.elements.user.value;
    const index = users.findIndex(item => item.email === value);
    if(index < 0 || value === item.user){
      setError('Email does not exists.')
    } else {
      shareTask(item.user, value, item.title);
      socket.emit('shareTask', {user: value, from: item.user, title: item.title});
      event.target.elements.user.value = '';
      if(error) setError('');
      setShare(false);
      alert('Task shared');
    }
  } 

  return(
    <React.Fragment>
      {!edit ? 
        <div>
          <div className={classnames('task-item-box', 'py-1 px-2', {completed: item.completed})}  >
            <blockquote className="blockquote"> 
              <p>{item.title}</p>
              {item.from && 
                <footer className="blockquote-footer">Received from {item.from}</footer>
              }
            </blockquote>
            <div className="icons">
              {!item.completed && <button className="btn btn-default" onClick={() => changeEdit(!edit)} ><FontAwesomeIcon icon={faPen} className="icon" /></button>}
              <button className="btn btn-default" onClick={() => checkTask(item)} ><FontAwesomeIcon icon={faCheck} className="icon" /></button>
              <button className="btn btn-default" onClick={() => setShare(share ? false : true)} ><FontAwesomeIcon icon={faShare} className="icon" /></button>
              <button className="btn btn-default" onClick={() => deleteTask(item)} ><FontAwesomeIcon icon={faWindowClose} className="icon" /></button>
            </div>
          </div>
          {share &&
          ///share form 
            <form className="text-center" onSubmit={handleShare}>
              <input 
                name="user"
                type="email" 
                className="form-control" 
                list="users" 
                onFocus={() => getUsers()} 
                placeholder="User's email"
                required
                autoFocus
              />
              <datalist id="users">
                {users.map((user, index) => {
                  if(user.email !== item.user){
                    return <option key={index}>{user.email}</option>
                  } else return null;
                })}
              </datalist>
              {error && 
                <p className="text-danger text-center mt-2">{error}</p>
              }
              <button type="submit" className="btn btn-info m-2">SHARE</button>
            </form>
          }
        </div>
        //// change title when user clicked edit button
        : <form onSubmit={handleSubmit} >
            <input 
              className="form-control" 
              type='text' 
              defaultValue={item.title} 
              onChange={event => setTitle(event.target.value)} 
              required
              autoFocus
            />
          </form> 
      }
      

    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}


export default connect(mapStateToProps, {deleteTask, checkTask, editTask, getUsers, shareTask})(TaskItem);
