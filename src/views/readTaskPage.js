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
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskContent, setTaskContent] = useState(tasks.content);

  useEffect(() => {
    setStartDate(new Date(tasks.startDate));
    setTaskTitle(tasks.title);
    setTaskContent(tasks.content);
  }, [tasks]);

  const handleClose = () => {
    // setShow(false);
  }

  const handleDateChange = (date) => {
    setStartDate(date);
    updateTask({ ...tasks, startDate: date });
  };

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

  const handleRepeatClick = () => {
    console.log('Repeat settings clicked');
  };

  const handleAlarmClick = () => {
    console.log('Alarm settings clicked');
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
        <FaCalendarCheck />
        <DatePickerModule
          startDate={startDate}
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