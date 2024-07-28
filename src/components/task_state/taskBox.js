import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { format } from 'date-fns';
import DatePickerModule from '../../modules/datePickerModule';
import SetTask from './setTask';

const TaskBox = ({ tasks, deleteTask, updateTask, lists, addList, updateList, deleteList}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks.selectedButton || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || 'NOALRAM');

  useEffect(() => {
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setIsRepeat(tasks.isRepeated || 'NOREPEAT');
    setIsNotified(tasks.isNotified || 'NOALRAM');
  }, [tasks]);

  const handleDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    updateTask({ ...tasks, startDate, endDate });
  };

  const handleSelectedButtonChange = async (button) => {
    setSelectedButton(button);
    updateTask({ ...tasks, dateStatus: button.toUpperCase() });
  };

  const handleRepeatClick = (option) => {
    const repeatMapping = {
      "반복없음": "NOREPEAT",
      "매일": "DAILY",
      "매주": "WEEKLY",
      "매달": "MONTHLY",
      "매년": "YEARLY"
    };
    const isRepeated = repeatMapping[option] || "NOREPEAT";
    setIsRepeat(isRepeated);
    const updatedTasks = { ...tasks, isRepeated: isRepeated };
    updateTask(updatedTasks);
  };

  const handleAlarmClick = (option) => {
    const alarmMapping = {
      "알림없음": "NOALRAM",
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
    };
    const isNotified = alarmMapping[option] || "NOALRAM";
    setIsNotified(isNotified);
    const updatedTasks = { ...tasks, isNotified: isNotified };
    updateTask(updatedTasks);
  };


  return (
    <div>
      <Row xs="auto">
        <Col sm={7}
        style={{ 
        display: "flex",
        alignItems: "center"}}
        ><CheckBox />&nbsp; {tasks.title}
        </Col>
        <Col md={4} className='righted' style={{ padding: "0" }} >

          {tasks.isRepeated !== 'NOREPEAT' && (
            <span className="repeat col-2"
            style={{ width: 20 }}>

              <LuRepeat style={{ color: "grey" }} />
            </span>
          )}
          {tasks.isNotified !== 'NOALRAM' && (
            <span className="alram col-2"
            style={{ width: 16 }}>
              <FaRegBell style={{ color: "grey" }} />
            </span>
          )}
          <DatePickerModule
            show={setShowDatePicker}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            onRepeatClick={handleRepeatClick}
            onAlarmClick={handleAlarmClick}
            selectedButton={selectedButton}
            setSelectedButton={handleSelectedButtonChange}
            initialRepeat={isRepeat}
            initialAlram={isNotified}
            dateFormat={'MM/dd'}
            lists={lists} 
            addList={addList} 
            updateList={updateList}
            deleteList={deleteList}
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