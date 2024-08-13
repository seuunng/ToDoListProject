import React, { useEffect, useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskCont.css';
import TaskBox from '../task_state/taskBox';
// import ReadTaskPage from '../../views/readTaskPage';
import { Row, Col } from 'react-bootstrap';

const TaskCont = ({ 
  tasks = [], updateTask, deleteTask, onTaskClick, 
  lists, addList, updateList, deleteList, refreshTasks,
  checked,  setChecked,  isCancelled,  setIsCancelled,  handleCancel,  handleCheckboxChange
 }) => {

  if (!Array.isArray(tasks)) {
    console.error("Tasks is not an array:", tasks);
    return null;
  }

  return (
    <div className="TaskContTable">
      <table className="task-table">
        <tbody>
          {tasks.map((task) => (
            <tr key={task.no}>
              <td className="task-cell" onClick={() => onTaskClick(task)}>
                <TaskBox
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  lists={lists} 
                  addList={addList} 
                  updateList={updateList}
                  deleteList={deleteList}
                  refreshTasks={refreshTasks}
                  checked={checked} 
                  setChecked={setChecked}  
                  isCancelled={isCancelled}
                  setIsCancelled={setIsCancelled}
                  handleCancel={handleCancel}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskCont;