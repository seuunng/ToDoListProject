import React from 'react';
import '../../styles/basicStyle.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';

const taskBox = ({ task, date }) => {
  return (
    <div>
      <Row>
        <Col md-9><CheckBox/> {task}</Col>
        <Col md-3 className='righted'> {date}</Col>
       </Row>
    </div>
  );
};

export default taskBox;