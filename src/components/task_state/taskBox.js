import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { format } from 'date-fns';
import SetTask from './setTask';
import DatePickerModule from '../../modules/datePickerModule';

const TaskBox = ({ tasks, deleteTask, updateTask}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks.selectedButton || 'DATE');
  const [isRepeat, setIsRepeat] = useState();

  useEffect(() => {
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setIsRepeat(tasks.isRepeat);
  }, []);
 
  const handleDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // setDateStatus(selectedButton);
    updateTask({ ...tasks, startDate, endDate });
  };

  const handleSelectedButtonChange = async (button) => {
    setSelectedButton(button);
    const updatedTasks = { ...tasks, dateStatus:  button.toUpperCase() };
    updateTask(updatedTasks);
  };

  const handleRepeatClick = (isRepeated) => {
    setIsRepeat(tasks.isRepeated)
    const updatedTasks = { ...tasks, isRepeated:  isRepeated };
    updateTask(updatedTasks);
  };

  const handleAlarmClick = () => {
    console.log('Alarm settings clicked');
  };

  const handleClose = () => setShowDatePicker(false);
  // const getDateFormat = () => {
  //   return selectedButton === 'date' ? 'MM/dd' : 'MM/dd-MM/dd';
  // };
  return (
    <div>
      <Row  xs="auto">
        <Col sm={8}><CheckBox /> {tasks.title}
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
        <Col md={3} className='righted' style={{ padding: "0" }} >
          <DatePickerModule
            show={showDatePicker}
            // handleClose={handleClose}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            onRepeatClick={handleRepeatClick}
            onAlarmClick={handleAlarmClick}
            dateFormat={'MM/dd'}
            selectedButton={selectedButton} 
            setSelectedButton={handleSelectedButtonChange}
          /></Col>
        <Col md={1} style={{ padding: "0" }} className='centered'>
          <SetTask
            task={tasks}
            deleteTask={deleteTask} />
        </Col>
      </Row>

    </div>
  );
};

export default TaskBox;