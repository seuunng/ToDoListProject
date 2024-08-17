import React, { useState, useEffect } from 'react';
import '../styles/basicStyle.css';
import '../styles/sideBar.css';
import instance from '../api/axios'
import ListItemsBox from './task_state/listItemsBox';
import CreateList from './task_list/createListModal';
import { useOutletContext } from 'react-router-dom';

const SideBar = ({ toggleSidebar,
  lists, addList, updateList, deleteList,
  smartLists, isSmartList, setIsSmartList,
  checked, setChecked, isCancelled, setIsCancelled, handleCancel, handleCheckboxChange }) => {

  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const switches = JSON.parse(localStorage.getItem('switches')) || {
    today: false,
    tomorrow: false,
    next7Days: false,
    defaultBox: false,
    completed: false,
    deleted: false
};

  const filteredSmartLists = smartLists.filter(list => {
    if (list.title === '오늘 할 일') return switches.today ?? false;
    if (list.title === '내일 할 일') return switches.tomorrow ?? false;
    if (list.title === '다음주 할 일') return switches.next7Days ?? false;
    if (list.title === '모든 할 일') return switches.defaultBox ?? false;
    if (list.title === '완료한 할 일') return switches.completed ?? false;
    if (list.title === '취소한 할 일') return switches.deleted ?? false;
    return false;
  });
  console.log("filteredSmartLists", filteredSmartLists)
  const filteredLists = lists.filter(list => !list.isDeleted);
  console.log("filteredLists", filteredLists)

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
                lists={filteredSmartLists}
                toggleSidebar={toggleSidebar}
                deleteList={deleteList}
                updateList={updateList}
                checked={checked}
                setChecked={setChecked}
                isCancelled={isCancelled}
                setIsCancelled={setIsCancelled}
                handleCancel={handleCancel}
                handleCheckboxChange={handleCheckboxChange}
                isSmartList={true}
                setIsSmartList={setIsSmartList}
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
                lists={filteredLists}
                toggleSidebar={toggleSidebar}
                deleteList={deleteList}
                updateList={updateList}
                checked={checked}
                setChecked={setChecked}
                isCancelled={isCancelled}
                setIsCancelled={setIsCancelled}
                handleCancel={handleCancel}
                handleCheckboxChange={handleCheckboxChange}
                isSmartList={false}
                setIsSmartList={setIsSmartList}
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