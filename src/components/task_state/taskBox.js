import React from 'react';
import '../../styles/basicStyle.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { format } from 'date-fns';

const taskBox = ({ tasks }) => {
  const formatDate = (date) => {
    const parsedDate = new Date(date);
      if (isNaN(parsedDate)) {
        return 'Invalid Date';
      }
      return format(parsedDate, 'MM.dd');; // 예쁜 날짜 형식
  };
  return (
    <div>
      <Row>
        <Col md-9><CheckBox/> {tasks.title}</Col>
          {tasks.isRepeated && (
            <span className="repeat col-2">
              <LuRepeat />
            </span>
          )}
          {tasks.isNotified && (
            <span className="alram col-2">
              <FaRegBell />
            </span>
          )}
        <Col md-3 className='righted'> {formatDate(tasks.startDate)}</Col>
       </Row>
    </div>
  );
};

export default taskBox;