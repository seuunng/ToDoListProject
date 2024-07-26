import React, { useState, useEffect } from 'react';
import '../styles/basicStyle.css';
import '../styles/readTaskPage.css';
import '../styles/datePickerModule.css';
import CheckBox from '../modules/checkBoxModule'
import { PiLineVerticalThin } from "react-icons/pi";
import { FaCalendarCheck } from "react-icons/fa";
import DatePickerModule from '../modules/datePickerModule';

const ReadTaskPage = ({ tasks, updateTask }) => {
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskContent, setTaskContent] = useState(tasks.content);

  useEffect(() => {
    setTaskTitle(tasks.title);
    setTaskContent(tasks.content);
  }, [tasks.title, tasks.content]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };
  const handleRepeatClick = () => {
    console.log('Repeat settings clicked');
  };

  const handleAlarmClick = () => {
    console.log('Alarm settings clicked');
  };
  return (
    <div className="readTaskPage">
      <div className="d-flex align-items-center">
          <CheckBox />
          <PiLineVerticalThin style={{ marginLeft: "5px", marginRight: "5px" }} />
          <FaCalendarCheck />
          <DatePickerModule
            onDateChange={handleDateChange}
            onRepeatClick={handleRepeatClick}
            onAlarmClick={handleAlarmClick}
          />
        </div>
      {/* <i className="fa-regular fa-flag"></i> */}
      <span className="task-title">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="form-control"
              placeholder="Task Title"
              style={{border: "none"}}
            />
          </span>
          <div className="description">
          <textarea
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            className="form-control"
            placeholder="설명"
            style={{border: "none"}}
          ></textarea>
        </div>
    </div>
  );
};

export default ReadTaskPage;