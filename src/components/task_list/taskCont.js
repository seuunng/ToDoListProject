import React, { useEffect, useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskCont.css';
import TaskBox from '../task_state/taskBox';
import ReadTaskPage from '../../views/readTaskPage';
import { Row, Col } from 'react-bootstrap';

const TaskCont = ({ tasks, updateTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="TaskCont">
      <Row>
          <table className="task-table col-6">
            <tbody>
              {tasks.map((task) => (
                <tr key={task.no}>
                  <td className="task-cell" onClick={() => handleTaskClick(task)}>
                    <TaskBox tasks={task} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        <Col className="ReadTaskPage">
          {selectedTask && (
            <ReadTaskPage
            tasks={selectedTask}
            updateTask={updateTask}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TaskCont;