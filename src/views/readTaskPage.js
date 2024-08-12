import React, { useState, useEffect } from 'react';
import '../styles/basicStyle.css';
import '../styles/readTaskPage.css';
import '../styles/datePickerModule.css';
import CheckBox from '../modules/checkBoxModule'
import { PiLineVerticalThin } from "react-icons/pi";
import { FaCalendarCheck } from "react-icons/fa";
import DatePickerModule from '../modules/datePickerModule';
import SetTask from '../components/task_state/setTask';
import SelectedList from '../components/task_list/selectedList.js';
import { TaskBoxProvider, useTaskBox } from '../contexts/taskBoxContext.js';
import instance from '../api/axios';
import { useTaskContext } from '../contexts/taskContext.js';

const ReadTaskPageContent = ({
  task,
  updateTask, deleteTask, lists, refreshTasks, onTaskClick, 
  // checked,  setChecked,  isCancelled,  setIsCancelled,
  handleCancel, handleCheckboxChange
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskContent, setTaskContent] = useState(task.content);
  const [startDate, setStartDate] = useState(new Date(task.startDate));
  const [endDate, setEndDate] = useState(task.endDate ? new Date(task.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(task.dateStatus || 'DATE');
  const [isRepeat, setIsRepeat] = useState(task.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(task.isNotified || 'NOALARM');
  const [checked, setChecked] = useState(task.taskStatus === 'COMPLETED');
  const [isCancelled, setIsCancelled] = useState(task.taskStatus === 'CANCELLED');

  const [selectedList, setSelectedList] = useState(null);

  // const { setIsTaskBox } = useTaskBox();

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
    setTaskTitle(task.title);
    setTaskContent(task.content);
    setStartDate(new Date(task.startDate));
    setEndDate(task.endDate ? new Date(task.endDate) : null);
    setSelectedButton(task.dateStatus || 'DATE');
    setIsRepeat(task.isRepeated || 'NOREPEAT');
    setIsNotified(task.isNotified || 'NOALARM');
    setSelectedList(lists.find(list => list.no === task.listNo) || null);
  
    setChecked(task.taskStatus === 'COMPLETED');
    setIsCancelled(task.taskStatus === 'CANCELLED');
  }, [task, lists, setChecked, setIsCancelled]);

  // useEffect(() => {
  //   setIsTaskBox(false);
  //   return () => setIsTaskBox(false);
  // }, [setIsTaskBox]);

  useEffect(() => {
    console.log("2 ", task.title);
    console.log("2 ", task.taskStatus);
    console.log("2 ", checked);
  }, [task, checked]);

  useEffect(() => {
    console.log("Checked state has changed:", checked);
    // 상태가 변경된 후에 필요한 작업을 여기에 추가
  }, [checked]);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    await updateTask({ ...task, title: newTitle });
    await refreshTasks();
  };

  const handleContentChange = async (e) => {
    const newContent = e.target.value;
    setTaskContent(newContent);
    await updateTask({ ...task, content: newContent });
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
    const updatedTask = { ...task, isRepeated: isRepeated };
    await updateTask(updatedTask);
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
    const updatedTask = { ...task, isNotified: isNotified };
    await updateTask(updatedTask);
    await refreshTasks();
  };

  return (
    <div className="readTaskPage">
      <div className="d-flex align-items-center">
        <CheckBox
          task={task}
          checked={checked}
          isCancelled={isCancelled}
          setChecked={setChecked}
          setIsCancelled={setIsCancelled}
          onChange={() => handleCheckboxChange(task.no)}
        />
        <PiLineVerticalThin style={{ marginLeft: "5px", marginRight: "5px" }} />
        <FaCalendarCheck onClick={() => setShowDatePicker(true)} />
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
          isTaskBox={false}
        // onSave={handleSaveSettings}
        />
      </div>
      {/* <i className="fa-regular fa-flag"></i> */}
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
      <div className="description">
        <textarea
          value={taskContent}
          onChange={handleContentChange}
          className="form-control-readTask"
          placeholder="설명"
          style={{ border: "none" }}
        ></textarea>

        <div className="d-flex align-items-center line row">
          <div className="list-title col lefted">
            <SelectedList
              lists={lists}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              task={task}
              updateTask={updateTask}
            />
          </div>
          <div className="setting-icon col righted">
            <SetTask
              task={task}
              deleteTask={deleteTask}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const ReadTaskPage = (props) => (
  <TaskBoxProvider>
    <ReadTaskPageContent {...props} />
  </TaskBoxProvider>
);
export default ReadTaskPage;