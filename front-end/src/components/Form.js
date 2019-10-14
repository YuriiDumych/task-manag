import React, {useState} from 'react';
import {addTask} from '../actions/task';
import {connect} from 'react-redux';


const Form = ({addTask, user, tasks}) => {

  const [title, changeTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const index = tasks.findIndex(item => item.title === title)
    if(index < 0){
      addTask(title, user);
      changeTitle('');
      if(error) setError('');
    } else {
      setError('Task already exists.')
    }
  }

  return(
    <React.Fragment>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="Task title" 
          value={title} 
          onChange={event => changeTitle(event.target.value)} 
          onBlur={() => setError('')}
          required />
        <button className="btn btn-success">ADD</button>
      </form>
      {error && 
        <p className="text-danger text-center mt-2">{error}</p>
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return{
    user: state.auth.user,
    tasks: state.tasks
  }
}

export default connect(mapStateToProps, {addTask})(Form);