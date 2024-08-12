import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/basicBoard.css';
import SimpleInputTask from '../../components/task_state/simpleInputTask'
import TaskCont from '../../components/task_list/taskCont';
import { Row, Col } from 'react-bootstrap';
import ReadTaskPage from '../readTaskPage';
import instance from '../../api/axios';
import { useParams, useOutletContext, useLocation } from 'react-router-dom';

const BasicBoard = () => {
  const location = useLocation();
  // const { isSmartList } = location.state || {}; 
  const { 
    tasks, addTask, updateTask, deleteTask, 
    lists, addList, updateList, deleteList, 
    smartLists, setSmartLists,
    checked,  setChecked,  isCancelled,  setIsCancelled,  
    handleCancel,  handleCheckboxChange, isSmartList, 
   } = useOutletContext();
  const [tasksByLists, setTasksByLists] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { listId } = useParams();
  const [listTitle, setListTitle] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  // console.log("BasicBoard isSmartList ", isSmartList);
  // console.log("BasicBoard", checked, isCancelled);

  const fetchListAndTasks = async () => {
    try {
      const endpoint = isSmartList 
      ? `/tasks/bySmartList?listId=${listId}` 
      : `/tasks/byList?listId=${listId}`;
      const response_tasks = await instance.get(endpoint);
      setTasksByLists(response_tasks.data);
    } catch (error) {
      console.error('Error tasks by list:', error);
    }
  };

  useEffect(() => {
    if (listId) {
      const list = lists.find(list => list.no === parseInt(listId));
      const smartList = smartLists.find(smartList => smartList.no === parseInt(listId));
      if (list) {
        setListTitle(list.title);
        setSelectedList(list);
      } else if (smartList) {
        setListTitle(smartList.title);
        setSelectedList(smartList);
      }
      fetchListAndTasks();
    }
  }, [listId, lists, smartLists]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  // useEffect(() => {
  //   // console.log("2 ", tasks.taskStatus);
  //   console.log("basicboard ", checked);
  // }, [tasks]);

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
            refreshTasks={fetchListAndTasks}
            checked={checked} 
            setChecked={setChecked}  
            isCancelled={isCancelled}
            setIsCancelled={setIsCancelled}
            handleCancel={handleCancel}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Col>
        <Col className="ReadTaskPage">
          {selectedTask && (
            <ReadTaskPage
              task={selectedTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              onTaskClick={handleTaskClick}
              lists={lists}
              refreshTasks={fetchListAndTasks}
              checked={checked} 
              setChecked={setChecked}  
              isCancelled={isCancelled}
              setIsCancelled={setIsCancelled}
              handleCancel={handleCancel}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BasicBoard;