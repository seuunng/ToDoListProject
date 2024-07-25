import React, { useState }  from 'react';
import '../styles/basicStyle.css';
import '../styles/sideBar.css';

import ListItemsBox from './task_state/listItemsBox';
import CreateList from './task_list/createListModal';
const SideBar = () => {
    
    const [showCreateListModal, setShowCreateListModal] = useState(false);

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
                <ListItemsBox value="" />
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
          />
        )}
      </div>
    )
}

export default SideBar;