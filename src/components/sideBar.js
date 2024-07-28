import React, { useState, useEffect } from 'react';
import '../styles/basicStyle.css';
import '../styles/sideBar.css';
import instance from '../api/axios'

import ListItemsBox from './task_state/listItemsBox';
import CreateList from './task_list/createListModal';
const SideBar = () => {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response_listData = await instance.get('/lists/list');
        const data_list = response_listData.data
        setLists(data_list);
      } catch (error) {
        console.error('Error get taskData:', error);
      }
    }
    fetchTableData();
  }, []);

  const showCreateList = () => {
    setShowCreateListModal(true);
  };
  const
    addList = async (newList) => {
      try {
        const response = await instance.post('/lists/list', newList);
        const addedlist = response.data;
        setLists([...lists, addedlist]);
      } catch (error) {
        console.error('Error adding list:', error);
      }
    };

  const updateList = async (updatedList) => {
    try {
      const response = await instance.put(`/lists/list/${updatedList.no}`, updatedList);
      const updatedlists = lists.map(list =>
        list.no === updatedList.no ? response.data : list
      );
      setLists(updatedlists);
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const deleteList = async (deletedList) => {
    try {
      await instance.delete(`/lists/list/${deletedList.no}`);
      // console.log(deletedlist.no);
      setLists(lists.filter(list => list.no !== deletedList.no));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
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
              <ListItemsBox value="" />
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
              lists={lists} />
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