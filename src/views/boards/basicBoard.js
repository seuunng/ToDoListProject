import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/basicBoard.css';
import SimpleInputTask from '../../components/task_state/simpleInputTask'
import TaskCont from '../../components/task_list/taskCont';
import { Row, Col } from 'react-bootstrap';
import ReadTaskPage from '../readTaskPage';


const BasicBoard = ({ tasks, addTask, updateTask, deleteTask,
  lists, addList, updateList, deleteList
}) => {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="BasicBoard">
      <h4 className="list-title">List Title</h4>
      <Row className="BasicBoardRow">
        <Col >
          <div className="task-table">
            <SimpleInputTask addTask={addTask} />
          </div>
          <TaskCont
            tasks={tasks}
            updateTask={updateTask}
            deleteTask={deleteTask}
            onTaskClick={handleTaskClick}
            lists={lists} 
            addList={addList} 
            updateList={updateList}
            deleteList={deleteList}
             />
        </Col>
        <Col className="ReadTaskPage">
          {selectedTask && (
            <ReadTaskPage
              tasks={selectedTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              lists={lists} 
              addList={addList} 
              updateList={updateList}
              deleteList={deleteList}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BasicBoard;