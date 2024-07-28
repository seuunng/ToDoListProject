import React from 'react';
import '../../styles/basicStyle.css';
import { IoReorderThree } from "react-icons/io5";
import { Row, Col } from 'react-bootstrap';

const ListItemsBox = ({ lists }) => {
  if (!Array.isArray(lists)) {
    return null;
  }
  return (
    <div>
      {lists.map((list, index) => (
        <div key={index} className="list-item">
          <span className="list-content">
            <Row>
              <Col sm={2}>
                {list.icon ? list.icon : <IoReorderThree />}
              </Col>
              <Col sm={8}>
                {list.title}
              </Col>
              <Col sm={2}>
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
          </span>
        </div>
      ))}
    </div>
  );
};

export default ListItemsBox;