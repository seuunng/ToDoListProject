import React, { useState, useEffect }  from 'react';
import '../../styles/basicStyle.css';
import SimpleInputTask from '../../components/task_state/simpleInputTask'
import TaskCont from '../../components/task_list/taskCont';
import instance from '../../api/axios'

const BasicBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response_taskData = await instance.get('/tasks/task');
        const data = response_taskData.data
        console.log(data);
        setTasks(data);

      } catch (error) {
        console.error('Error get taskData:', error);
      }
    }
    fetchTableData();
  }, []);

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