import React from 'react';
import '../../styles/basicStyle.css';
import { IoReorderThree } from "react-icons/io5";
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SetList from '../task_list/setList';
//리스트 목록(아이콘+제목+색+세팅)
const ListItemsBox = ({ lists, toggleSidebar, deleteList, updateList, isSmartList, 
  checked, isCancelled }) => {
  return (
    <div>
      {lists.map((list, index) => {
        if (!list) {
          return null;
        }
        // console.log(list, isSmartList)


        // console.log("Link state:", { checked, isCancelled, isSmartList });
        return (
          <div key={index} className="list-item">
            <span className="list-content">
              <Row>
                <Col style={{ padding: "0" }}>
                  {/* 연결 */}
                  <Link
                    to={`/basicBoard/${list?.no}`}
                    state= {{ checked, isCancelled, isSmartList }}
                    className="item"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      toggleSidebar();
                    }}
                  >
                    
                    <Row style={{ marginBottom: "8px" }}  >
                      {/* 아이콘 */}
                      <Col sm={2}>
                      {list.icon ? list.icon : <IoReorderThree />}
                      </Col>
                      {/* 제목 */}
                      <Col sm={7} style={{ padding: "0" }}>
                        {list.title}
                      </Col>
                      {/* 색 */}
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
                {/* 세팅 드롭박스 아이콘 */}
                <Col md={1} style={{ padding: "0", color: "grey", display: "flex", justifyContent: "center" }}>
                  {isSmartList? '': 
                    <SetList
                      list={list}
                      updateList={updateList}
                      deleteList={deleteList} />
                  }
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