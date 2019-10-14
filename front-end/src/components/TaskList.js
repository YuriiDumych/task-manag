import TaskItem from './TaskItem';
import React from 'react';
const TaskList = ({tasks, loading, socket}) => {
  return(
    <div>
        { tasks.length ?
          tasks.map((item, index) => <TaskItem key={index} item={item} socket={socket} />)
          : (loading ? null : <p className="text-center">No tasks to do.</p>)
        }
    </div>
  )
}

export default TaskList;