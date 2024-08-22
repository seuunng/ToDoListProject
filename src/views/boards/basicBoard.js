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

  const {
    tasks, addTask, updateTask, deleteTask,
    lists,
    smartLists,
    checked, setChecked, isCancelled, setIsCancelled,
    handleCancel, handleCheckboxChange, setIsSmartList, isSmartList, handleReopen
  } = useOutletContext();

  const [tasksByLists, setTasksByLists] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { listId } = useParams();
  const [listTitle, setListTitle] = useState('');
  const [listIcon, setListIcon] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    fetchListAndTasks()
  }, [selectedList])

  const fetchListAndTasks = async () => {
    try {
      let endpoint;

      if (isSmartList) {
        switch (listTitle) {
          case '모든 할 일':
            endpoint = '/tasks/default';
            break;
          case '오늘 할 일':
            endpoint = '/tasks/today';
            break;
          case '내일 할 일':
            endpoint = '/tasks/tomorrow';
            break;
          case '다음주 할 일':
            endpoint = '/tasks/next7Days';
            break;
          case '완료한 할 일':
            endpoint = '/tasks/completed';
            break;
          case '취소한 할 일':
            endpoint = '/tasks/deleted';
            break;
          default:
            console.error('Unknown smart list title:', listTitle);
            return;
        }
      }
      else {
        endpoint = `/tasks/byList?listId=${listId}`;
      }

      const response_tasks = await instance.get(endpoint);
      // 'DELETED' 상태의 태스크들을 제외하고 리스트에 표시
      const filteredTasks = listTitle === '취소한 할 일'
      ? response_tasks.data.filter(task => task.taskStatus === 'CANCELLED')
      : response_tasks.data.filter(task => task.taskStatus !== 'DELETED' && task.taskStatus !== 'CANCELLED');

    setTasksByLists(filteredTasks);

    } catch (error) {
      console.error('Error fetching tasks by list:', error);
    }
  };

  useEffect(() => {
    if (listId) {
      const list = lists.find(list => list.no === parseInt(listId));
      const smartList = smartLists.find(smartList => smartList.no === parseInt(listId));

      if (list) {
        setListTitle(list.title);
        setListIcon(list.icon);
        setSelectedList(list);
        setIsSmartList(false);
      } else if (smartList) {
        setListTitle(smartList.title);
        setListIcon(smartList.icon);
        setSelectedList(smartList);
        setIsSmartList(true);
      }
      fetchListAndTasks();
    }
  }, [listId, lists, smartLists]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    // fetchListAndTasks()
  };

  return (
    <div className="BasicBoard">
      <h4 className="list-title">{listIcon} {listTitle}</h4>
      <Row className="BasicBoardRow">
        <Col >
          <div className="task-table">
            <SimpleInputTask
              addTask={addTask}
              lists={selectedList || []}
              listTitle={selectedList ? selectedList.title : ''}
              refreshTasks={fetchListAndTasks}
              listId={listId}
              isSmartList={isSmartList}
            />
          </div>
          <TaskCont
            tasks={tasksByLists}
            updateTask={updateTask}
            deleteTask={deleteTask}
            onTaskClick={handleTaskClick}
            lists={selectedList || []}
            refreshTasks={fetchListAndTasks}
            checked={checked}
            setChecked={setChecked}
            isCancelled={isCancelled}
            setIsCancelled={setIsCancelled}
            handleCancel={handleCancel}
            handleCheckboxChange={handleCheckboxChange}
            handleReopen={handleReopen}
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
              handleReopen={handleReopen}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BasicBoard;