import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskStatus.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import DatePickerModule from '../../modules/datePickerModule';
import SetTask from './setTask';
import { TaskBoxProvider, useTaskBox } from '../../contexts/taskBoxContext';
import { useTaskContext } from '../../contexts/taskContext';

const TaskBoxContent = ({
  task = {},
  deleteTask, updateTask, lists, refreshTasks,
  // checked, setChecked, isCancelled, setIsCancelled,  
  handleCheckboxChange, handleCancel
}) => {
  const getValidDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  };

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [startDate, setStartDate] = useState(getValidDate(task.startDate));
  const [endDate, setEndDate] = useState(task.endDate ? getValidDate(task.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(task.selectedButton || 'DATE');
  const [isRepeat, setIsRepeat] = useState(task.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(task.isNotified || 'NOALARM');
  const [checked, setChecked] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { setIsTaskBox } = useTaskBox();

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
    if (task && task.title) {
      setTaskTitle(task.title);
      setStartDate(getValidDate(task.startDate));
      setEndDate(task.endDate ? getValidDate(task.endDate) : null);
      setSelectedButton(task.dateStatus || 'DATE');
      setIsRepeat(task.isRepeated || 'NOREPEAT');
      setIsNotified(task.isNotified || 'NOALARM');
      setChecked(task.taskStatus === 'COMPLETED');
      setIsCancelled(task.taskStatus === 'CANCELLED');
    }
  }, [task, setChecked, setIsCancelled]);

  useEffect(() => {
    setIsTaskBox(true);
    return () => setIsTaskBox(false);
  }, [setIsTaskBox]);

  // useEffect(() => {
  //   console.log("taskbox ", checked);
  // }, [task]);

  // useEffect(() => {
  //   console.log("1 ", task.title);
  //   console.log("1 ", task.taskStatus);
  //   console.log("1 ", checked);
  // }, [task]);

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
      "알림없음": "NOALARM",
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
    };
    const isNotified = alarmMapping[option] || "NOALARM";
    setIsNotified(isNotified);
    const updatedTasks = { ...task, isNotified: isNotified };
    await updateTask(updatedTasks);
  };

  const taskStatusClassName = task.taskStatus === 'OVERDUE'
    ? 'task-overdue'
    : task.taskStatus === 'COMPLETED'
      ? 'task-completed'
      : task.taskStatus === 'CANCELLED'
        ? 'task-cancelled'
        : '';
  
  return (
    <div className={`task-box ${taskStatusClassName}`}>
      <Row xs="auto">
        <Col sm={8}
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
            onChange={() => handleCheckboxChange(task.no)}
            className={`task-box ${taskStatusClassName}`}
          /> &nbsp;
          <span className="task-title">
            <input
              type="text"
              value={taskTitle}
              onChange={handleTitleChange}
              className={`form-control task-box ${taskStatusClassName}`}

            placeholder="Task Title"
            style={{ border: "none", width: 260 }}
        
            />
          </span>
        </Col>
        <Col md={3} className='righted' style={{ padding: "0" }}>
          {task.isRepeated !== 'NOREPEAT' && (
            <span 
            className={`repeat col-2 task-box ${taskStatusClassName}`}
            style={{ width: 16 }}>
              <LuRepeat style={{ color: "grey" }} className={`task-box ${taskStatusClassName}`}/>
            </span>
          )}
          &nbsp;
          {(initialAlarm !== 'NOALARM' || task.isNotified !== 'NOALARM') && (
            <span  
            className={`alram col-2 task-box ${taskStatusClassName}`}
            style={{ width: 16 }}>
              <FaRegBell style={{ color: "grey" }} className={`task-box ${taskStatusClassName}`}/>
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
            className={`task-box ${taskStatusClassName}`}
          />
        </Col>
        <Col md={1} style={{ padding: "0" }} className='centered'>
          <SetTask
            task={task}
            deleteTask={deleteTask}
            isCancelled={isCancelled}
            setIsCancelled={setIsCancelled}
            handleCancel={() => handleCancel(task)}
            className={`task-box ${taskStatusClassName}`}
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