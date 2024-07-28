import React, { useState, useEffect } from 'react';
import '../styles/basicStyle.css';
import '../styles/readTaskPage.css';
import '../styles/datePickerModule.css';
import CheckBox from '../modules/checkBoxModule'
import { PiLineVerticalThin } from "react-icons/pi";
import { FaCalendarCheck } from "react-icons/fa";
import DatePickerModule from '../modules/datePickerModule';
import SetTask from '../components/task_state/setTask';


const ReadTaskPage = ({ tasks, updateTask, deleteTask }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskContent, setTaskContent] = useState(tasks.content);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks.dateStatus || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || 'NOALRAM');
  

  useEffect(() => {
    setTaskTitle(tasks.title);
    setTaskContent(tasks.content);
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setIsRepeat(tasks.isRepeated || 'NOREPEAT');
    setIsNotified(tasks.isNotified || 'NOALRAM');
  }, [tasks]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    updateTask({ ...tasks, title: newTitle });
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setTaskContent(newContent);
    updateTask({ ...tasks, content: newContent });
  };

  const handleDateChange = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    updateTask({ ...tasks, startDate, endDate });
  };

  const handleSelectedButtonChange = (button) => {
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
    const updatedTasks = { ...tasks, isRepeated:  isRepeated };
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
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {

  //   const updatedTask = {
  //     ...tasks,
  //     title: taskTitle,
  //     content: taskContent,
  //     startDate,
  //   };
  //   updateTask(updatedTask);
  //   }
  // };
  return (
    <div className="readTaskPage">
      <div className="d-flex align-items-center">
        <CheckBox />
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
          initialAlram={isNotified}
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
          <div className="list-title col lefted">{tasks.title}</div>
          <div className="setting-icon col righted">
            <SetTask
              task={tasks}
              deleteTask={deleteTask} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadTaskPage;