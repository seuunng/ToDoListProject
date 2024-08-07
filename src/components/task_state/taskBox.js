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

const TaskBoxContent = ({ tasks, deleteTask, updateTask, lists, refreshTasks }) => {
  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
    "정각": "ONTIME",
    "5분전": "FIVEMINS",
    "30분전": "THIRTYMINS",
    "하루전": "DAYEARLY"
  };
  const initialAlarm = savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks.selectedButton || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || 'NOALRAM');
  const { setIsTaskBox } = useTaskBox();
  const [checked, setChecked] = useState(tasks.status === 'COMPLETED');

  useEffect(() => {
    setTaskTitle(tasks.title);
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setIsRepeat(tasks.isRepeated || 'NOREPEAT');
    setIsNotified(tasks.isNotified || 'NOALRAM');
  }, [tasks]);

  useEffect(() => {
    setIsTaskBox(true);
    return () => setIsTaskBox(false);
  }, [setIsTaskBox]);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    await updateTask({ ...tasks, title: newTitle });
    await refreshTasks();
  };

  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    await updateTask({ ...tasks, startDate, endDate });
    await refreshTasks();
  };

  const handleSelectedButtonChange = async (button) => {
    setSelectedButton(button);
    await updateTask({ ...tasks, dateStatus: button.toUpperCase() });
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
    const updatedTasks = { ...tasks, isRepeated: isRepeated };
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
    const updatedTasks = { ...tasks, isNotified: isNotified };
    await updateTask(updatedTasks);
  };

  const handleCheckboxChange = (isChecked) => {
    setChecked(isChecked);
  };

  const handleCancel = async () => {
    const newStatus = 'CANCELLED';
    if (tasks && tasks.no) {
      try {
        const response = await instance.put(`/tasks/${tasks.no}/status`, {
          status: newStatus,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 200) {
          await refreshTasks();
        } else {
          console.error('Failed to update task status');
        }
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    } else {
      console.error('Task object is missing or task.no is undefined');
    }
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
            task={tasks}
            checked={checked}
            onChange={handleCheckboxChange}
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
          {tasks.isRepeated !== 'NOREPEAT' && (
            <span className="repeat col-2" style={{ width: 16 }}>
              <LuRepeat style={{ color: "grey" }} />
            </span>
          )}
          {(initialAlarm !== 'NOALARM' || tasks.isNotified !== 'NOALARM') && (
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
            task={tasks}
            deleteTask={deleteTask}
            handleCancel={handleCancel}
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