import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/basicBoard.css';
import SimpleInputTask from '../../components/task_state/simpleInputTask'
import TaskCont from '../../components/task_list/taskCont';
import { Row, Col } from 'react-bootstrap';
import ReadTaskPage from '../readTaskPage';
import instance from '../../api/axios';
import { useParams, useOutletContext } from 'react-router-dom';

const BasicBoard = () => {
  const { tasks, addTask, updateTask, deleteTask, lists, addList, updateList, deleteList } = useOutletContext();
  const [tasksByLists, setTasksByLists] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { listId } = useParams();
  const [listTitle, setListTitle] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  const fetchListAndTasks = async () => {
    try {
      const response_tasks = await instance.get(`/tasks/byList?listId=${listId}`);
      setTasksByLists(response_tasks.data);
    } catch (error) {
      console.error('Error tasks by list:', error);
    }
  };

  useEffect(() => {
    if (listId) {
      fetchListAndTasks();
    }

    if (Array.isArray(lists)) {
      const list = lists.find(list => list.no === parseInt(listId));
      if (list) {
        setListTitle(list.title);
        setSelectedList(list);
      }
    }
  }, [listId, lists]);



  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="BasicBoard">
      <h4 className="list-title">{listTitle}</h4>
      <Row className="BasicBoardRow">
        <Col >
          <div className="task-table">
            <SimpleInputTask
              addTask={addTask}
              lists={selectedList}
              listTitle={selectedList ? selectedList.title : ''} 
              refreshTasks={fetchListAndTasks} />
          </div>
          <TaskCont
            tasks={tasksByLists}
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
              refreshTasks={fetchListAndTasks}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BasicBoard;