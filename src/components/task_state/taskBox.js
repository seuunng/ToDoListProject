import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { format } from 'date-fns';
import SetTask from './setTask';
import DatePickerModule from '../../modules/datePickerModule';

const TaskBox = ({ tasks, deleteTask, updateTask }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
 
  useEffect(() => {
    setStartDate(new Date(tasks.startDate));
  }, [tasks]);
 
  const handleDateChange = (date) => {
    setStartDate(date);
    updateTask({ ...tasks, startDate: date });
  };

  const handleRepeatClick = () => {
    console.log('Repeat settings clicked');
  };

  const handleAlarmClick = () => {
    console.log('Alarm settings clicked');
  };

  const handleClose = () => setShowDatePicker(false);

  return (
    <div>
      <Row>
        <Col md={10}><CheckBox /> {tasks.title}
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
        </Col>
        <Col md={1} className='righted' style={{ padding: "0" }} >
          <DatePickerModule
            show={showDatePicker}
            // handleClose={handleClose}
            startDate={startDate}
            onDateChange={handleDateChange}
            onRepeatClick={handleRepeatClick}
            onAlarmClick={handleAlarmClick}
            dateFormat={"MM/dd"}
          /></Col>
        <Col md={1} style={{ padding: "0" }} className='righted'>
          <SetTask
            task={tasks}
            deleteTask={deleteTask} />
        </Col>
      </Row>

    </div>
  );
};

export default TaskBox;