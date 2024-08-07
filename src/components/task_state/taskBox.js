import React, { useState, useEffect, useContext } from 'react';
import '../../styles/basicStyle.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import { format } from 'date-fns';
import DatePickerModule from '../../modules/datePickerModule';
import SetTask from './setTask';
import { TaskBoxProvider, useTaskBox   } from '../../contexts/taskBoxContext';

const TaskBoxContent = ({ tasks, deleteTask, updateTask, lists, addList, updateList, deleteList,refreshTasks }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks.selectedButton || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || 'NOALRAM');
  const { setIsTaskBox } = useTaskBox();

  useEffect(() => {
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
            alignItems: "center"
          }}
        ><CheckBox />&nbsp;
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
        <Col md={4} className='righted' style={{ padding: "0" }} >

          {tasks.isRepeated !== 'NOREPEAT' && (
            <span className="repeat col-2"
              style={{ width: 16 }}>
              <LuRepeat style={{ color: "grey" }} />
            </span>
          )}
          {tasks.isNotified !== 'NOALARM' && (
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
            // addList={addList}
            // updateList={updateList}
            // deleteList={deleteList}
            isTaskBox={true}
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
const TaskBox = (props) => (
  <TaskBoxProvider>
    <TaskBoxContent {...props} />
  </TaskBoxProvider>
);
export default TaskBox;