import React from 'react';
import '../../styles/basicStyle.css';
import TaskBox from '../task_state/taskBox';
import { format } from 'date-fns';

const TaskCont = ({ tasks }) => {
  const formatDate = (date) => {
    const parsedDate = new Date(date);
      if (isNaN(parsedDate)) {
        return 'Invalid Date';
      }
      return format(parsedDate, 'MM.dd');; // 예쁜 날짜 형식
  };
  return (
    <div className="TaskCont">
      <table className="task-table">
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className="task-cell">
                <TaskBox task={task.text} date={formatDate(task.date)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskCont;