import React, { useState, useEffect } from 'react';
import '../styles/basicStyle.css';
import '../styles/sideBar.css';
import instance from '../api/axios'
import ListItemsBox from './task_state/listItemsBox';
import CreateList from './task_list/createListModal';
import { useOutletContext } from 'react-router-dom';

const SideBar = ({ toggleSidebar, 
  tasks, addTask, updateTask, deleteTask, 
  lists, addList, updateList, deleteList,
  smartLists,
  checked,  setChecked,  isCancelled,  setIsCancelled,  handleCancel,  handleCheckboxChange }) => {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [tasksByLists, setTasksByLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    if (selectedList) {
      const fetchTasksByList = async () => {
        try {
          const response_taskByLists = await instance.get(`/tasks/byList?listId=${selectedList.no}`);
          const data_tasks = response_taskByLists.data;
          setTasksByLists(data_tasks);
        } catch (error) {
          console.error('Error getting taskByLists:', error);
        }
      };
      fetchTasksByList();
    }
  }, [selectedList]);

  const showCreateList = () => {
    setShowCreateListModal(true);
  };
      
  return (
    <div>
      <div className="sideBar">
        <div className="content">
          <div className="listCont">
            <div className="d-flex align-items-center title">
              <h6 className="item">Smart Lists</h6>
            </div>
            <div className="list">
              <ListItemsBox
              lists={smartLists}
              toggleSidebar={toggleSidebar}
              deleteList ={deleteList }
              updateList={updateList}
              checked={checked} 
              setChecked={setChecked}  
              isCancelled={isCancelled}
              setIsCancelled={setIsCancelled}
              handleCancel={handleCancel}
              handleCheckboxChange={handleCheckboxChange}
              isSmartList={true} 
            />
            </div>
          </div>
          <hr />
          <div className="listCont">
            <div className="d-flex align-items-center title">
              <h6 className="item">Lists</h6>
              <i className="fa-solid fa-plus" onClick={showCreateList}></i>
            </div>
            <div className="list">
              <ListItemsBox  
              lists={lists}
              toggleSidebar={toggleSidebar}
              deleteList ={deleteList}
              updateList={updateList}
              checked={checked} 
              setChecked={setChecked}  
              isCancelled={isCancelled}
              setIsCancelled={setIsCancelled}
              handleCancel={handleCancel}
              handleCheckboxChange={handleCheckboxChange} 
              isSmartList={false} 
            />
            </div>
          </div>
        </div>
      </div>
      {showCreateListModal && (
        <CreateList
          show={showCreateListModal}
          onHide={() => setShowCreateListModal(false)}
          icon="&"
          list="할일목록"
          count="20"
          color="red"
          lists={lists}
          addList={addList}
        />
      )}
    </div>
  )
}

export default SideBar;