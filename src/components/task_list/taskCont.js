import React, { useEffect, useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskCont.css';
import TaskBox from '../task_state/taskBox';
import ReadTaskPage from '../../views/readTaskPage';
import { Row, Col } from 'react-bootstrap';

const TaskCont = ({ tasks, updateTask, deleteTask, onTaskClick }) => {

  return (
    <div className="TaskCont">
      <table className="task-table">
        <tbody>
          {tasks.map((task) => (
            <tr key={task.no}>
              <td className="task-cell" onClick={() => onTaskClick(task)}>
                <TaskBox
                  tasks={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
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