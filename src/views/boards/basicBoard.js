import React, { useState }  from 'react';
import '../../styles/basicStyle.css';
import SimpleInputTask from '../../components/task_state/simpleInputTask'
import TaskCont from '../../components/task_list/taskCont';

const BasicBoard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', date: '2024-06-01' },
    { id: 2, text: 'Task 2', date: '2024-06-02' },
    // Add more tasks here
  ]);
  const addTask = (newTask) => {
   setTasks([...tasks, newTask]);
    console.log("Task added:", newTask);
  };
  return (
    <div className="BasicBoard">
    <h4 className="list-title">List Title</h4>    
    <div className="task-table">
      <SimpleInputTask onTaskCreated={addTask} />
    </div>
    <div>
      <TaskCont tasks={tasks} />
    </div>
  </div>
  );
};

export default BasicBoard;