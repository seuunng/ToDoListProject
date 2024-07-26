import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import { Modal, Button } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import DatePickerModule from '../../modules/datePickerModule';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaCalendarCheck } from "react-icons/fa";
import ko from 'date-fns/locale/ko';
import Checkbox from '../../modules/checkBoxModule';
import { PiLineVerticalThin } from "react-icons/pi";

const ReadTaskModal = forwardRef(({ tasks , updateTask}, ref) => {
  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskDescription, setTaskDescription] = useState(tasks.content);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));

  useEffect(() => {
    setTaskTitle(tasks.title);
    setTaskDescription(tasks.content);
  }, [tasks.title, tasks.content]);

  const handleClose = () => {
    const updatedTask = {
      ...tasks,
      title: taskTitle,
      content: taskDescription,
      startDate,
      // Add other task fields as necessary
    };
    updateTask(updatedTask);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    openModal: handleShow,
  }));

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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className="d-flex align-items-center">
          <Checkbox />
          <PiLineVerticalThin style={{ marginLeft: "5px", marginRight: "5px" }} />
          <FaCalendarCheck />
          <DatePickerModule
            onDateChange={handleDateChange}
            onRepeatClick={handleRepeatClick}
            onAlarmClick={handleAlarmClick}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center line">
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
          {/* <span className="flag-icon">
            <i className="fa-regular fa-flag"></i>
          </span> */}
        </div>
        <div className="description">
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="form-control"
            placeholder="Task Description"
            style={{border: "none"}}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex align-items-center line row"
          style={{ width: "100vw" }}>
          <div className="list-title col lefted">{tasks.title}</div>
          <div className="setting-icon col righted">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        {/* <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
        <button type="button" className="btn btn-primary">Save changes</button> */}
      </Modal.Footer>
    </Modal>
  );
});

export default ReadTaskModal;