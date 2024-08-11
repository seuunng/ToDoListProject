import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import DatePickerModule from '../../modules/datePickerModule';
import SetTask from './setTask';
import { TaskBoxProvider, useTaskBox } from '../../contexts/taskBoxContext';
import instance from '../../api/axios';
import { useTaskContext } from '../../contexts/taskContext';

const TaskBoxContent = ({ 
  task = {},
  deleteTask, updateTask, lists, refreshTasks,
  checked, setChecked, isCancelled, setIsCancelled,  
 }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const getValidDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  }; 
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [startDate, setStartDate] = useState(getValidDate(task.startDate));
  const [endDate, setEndDate] = useState(task.endDate ? getValidDate(task.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(task.selectedButton || 'DATE');
  const [isRepeat, setIsRepeat] = useState(task.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(task.isNotified || 'NOALRAM');
  const { setIsTaskBox } = useTaskBox();
  // const [checked, setChecked] = useState(false);
  // const [isCancelled, setIsCancelled] = useState(false);
  // const { checked, setChecked, isCancelled, setIsCancelled } = useTaskContext();

  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
    "정각": "ONTIME",
    "5분전": "FIVEMINS",
    "30분전": "THIRTYMINS",
    "하루전": "DAYEARLY"
  };
  const initialAlarm = savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";

  useEffect(() => {
    console.log(task.title);
     if (task && task.title) {
      setTaskTitle(task.title);
      setStartDate(getValidDate(task.startDate));
      setEndDate(task.endDate ? getValidDate(task.endDate) : null);
      setSelectedButton(task.dateStatus || 'DATE');
      setIsRepeat(task.isRepeated || 'NOREPEAT');
      setIsNotified(task.isNotified || 'NOALRAM');
      setChecked(task.taskStatus === 'COMPLETED');
      setIsCancelled(task.taskStatus === 'CANCELLED');
    }
  }, [task, setChecked, setIsCancelled]);

  useEffect(() => {
    setIsTaskBox(true);
    return () => setIsTaskBox(false);
  }, [setIsTaskBox]);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    await updateTask({ ...task, title: newTitle });
    await refreshTasks();
  };

  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    await updateTask({ ...task, startDate, endDate });
    await refreshTasks();
  };

  const handleSelectedButtonChange = async (button) => {
    setSelectedButton(button);
    await updateTask({ ...task, dateStatus: button.toUpperCase() });
    await refreshTasks();
  };

  const handleRepeatClick = async (option) => {
    const repeatMapping = {
      "반복없음": "NOREPEAT",
      "매일": "DAILY",
      "매주": "WEEKLY",
      "매달": "MONTHLY",
      "매년": "YEARLY"
    };
    const isRepeated = repeatMapping[option] || "NOREPEAT";
    setIsRepeat(isRepeated);
    const updatedTasks = { ...task, isRepeated: isRepeated };
    await updateTask(updatedTasks);
    await refreshTasks();
  };

  const handleAlarmClick = async (option) => {
    const alarmMapping = {
      "알림없음": "NOALRAM",
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
    };
    const isNotified = alarmMapping[option] || "NOALRAM";
    setIsNotified(isNotified);
    const updatedTasks = { ...task, isNotified: isNotified };
    await updateTask(updatedTasks);
  };

  return (
    <div>
      <Row xs="auto">
        <Col sm={7}
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <CheckBox
            task={task}
            checked={checked}
            isCancelled={isCancelled}
            setChecked={setChecked} 
            setIsCancelled={setIsCancelled}
            onChange={() => setChecked(!checked)}
          /> &nbsp;
          <span className="task-title">
            <input
              type="text"
              value={taskTitle}
              onChange={handleTitleChange}
              className="form-control"
              placeholder="Task Title"
              style={{ border: "none" }}
            />
          </span>
        </Col>
        <Col md={4} className='righted' style={{ padding: "0" }}>
          {task.isRepeated !== 'NOREPEAT' && (
            <span className="repeat col-2" style={{ width: 16 }}>
              <LuRepeat style={{ color: "grey" }} />
            </span>
          )}
          {(initialAlarm !== 'NOALARM' || task.isNotified !== 'NOALARM') && (
            <span className="alram col-2" style={{ width: 16 }}>
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
            initialAlarm={initialAlarm}
            isNotified={isNotified}
            dateFormat={'MM/dd'}
            isTaskBox={true}
            lists={lists}
          />
        </Col>
        <Col md={1} style={{ padding: "0" }} className='centered'>
          <SetTask
            task={task}
            deleteTask={deleteTask}
            handleCancel={() => setIsCancelled(true)}
          />
        </Col>
      </Row>
    </div>
  );
};

const TaskBox = (props) => (
  <TaskBoxProvider>
    <TaskBoxContent {...props} />
  </TaskBoxProvider>
);

export default TaskBox;