import React from 'react';
import '../../styles/basicStyle.css';
import { IoReorderThree } from "react-icons/io5";
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SetList from '../task_list/setList';

const ListItemsBox = ({ lists, toggleSidebar, deleteList, updateList,
  checked,  setChecked,  isCancelled,  setIsCancelled,  handleCancel,  handleCheckboxChange }) => {
  if (!Array.isArray(lists)) {
    return null;
  }
  // console.log('Rendering ListItemsBox with lists:', lists);
  return (
    <div>
      {lists.map((list, index) => {
        if (!list) {
          return null;
        }
        return (
          <div key={index} className="list-item">
            <span className="list-content">

              <Row>
                <Col style={{ padding: "0" }}>
                  <Link 
            to={{
              pathname: `/basicBoard/${list?.no}`,
              state: { checked, isCancelled }
            }}
                    className="item"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      toggleSidebar();
                      // setChecked(false);
                      // setIsCancelled(false);
                      // handleCheckboxChange();
                      // handleCancel();
                    }}
                    >
                    <Row style={{ marginBottom: "8px" }} >
                      <Col sm={2}>
                        {list.icon ? list.icon : <IoReorderThree />}
                      </Col>
                      <Col sm={7} style={{ padding: "0" }}>
                        {list.title}
                      </Col>
                      <Col sm={1} style={{ padding: "0" }}>
                        {list.color && (
                          <i
                            className="fa-solid fa-circle align-items-center"
                            style={{
                              color: list.color,
                              fontSize: '10px',
                              width: '12px',
                            }}
                          ></i>
                        )}
                      </Col>
                    </Row>
                  </Link>
                </Col>
                <Col md={1} style={{ padding: "0", color: "grey", display: "flex", justifyContent: "center" }}>
                  <SetList
                    list={list}
                    updateList={updateList}
                    deleteList={deleteList} />
                </Col>

              </Row>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ListItemsBox;