import React, { useState, useRef, useImperativeHandle, useEffect, forwardRef } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/createTask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isValid } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import { FaCalendarCheck } from "react-icons/fa";
import ko from 'date-fns/locale/ko';
import Checkbox from '../../modules/checkBoxModule';
import { PiLineVerticalThin } from "react-icons/pi";

const CreateTaskModal = forwardRef((props, ref) => {
  const { addTask, date } = props;
  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
    startDate: date,
  });
  useEffect(() => {
    if (show) {
      setNewTask(prevState => ({
        ...prevState,
        startDate: date,
      }));
    }
  }, [show, date]);
  const handleClose = () =>  {
    if (newTask.title.trim()) {
      const task = {
        ...newTask,
        isNotified: 'NOALRAM',
        isRepeated: 'NOREPEAT',
        endDate: '',
        priority: 'MEDIUM',
        taskStatus: 'PENDING'
      };
      addTask(task);
    }
    setNewTask({
      title: '',
      content: '',
      startDate: date,
    });
    setShow(false);
  };
  const handleShow = () => {
    setNewTask(prevState => ({
      ...prevState,
      startDate: date,
    }));
    setShow(true);
  };
  useImperativeHandle(ref, () => ({
    showModal: handleShow,
  }));
  const createTask = () => {
    if (newTask.title.trim()) {
      const task = {
        ...newTask,
        isNotified: 'NOALRAM',
        isRepeated: 'NOREPEAT',
        endDate: '',
        priority: 'MEDIUM',
        taskStatus: 'PENDING'
      };
      addTask(task);
      setNewTask({
        title: '',
        content: '',
        startDate: date,
      });
      handleClose();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setNewTask(prevState => ({
      ...prevState,
      startDate: date
    }));
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className="d-flex align-items-center">
          <FaCalendarCheck />
          <DatePicker 
            selected={newTask.startDate} 
            onChange={handleDateChange}
            locale={ko}
            dateFormat="yyyy-MM-dd"
            className="form-control" />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center line">
          <span className="task-title">
            <input
              type="text"
              name="title"
              className="task-title-input"
              placeholder="할일을 입력하세요"
              value={newTask.title}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </span>
          {/* <span className="flag-icon">
          <i className="fa-regular fa-flag"></i>
        </span> */}
        </div>
        <div className="description">
          <textarea
            className="description-input"
            name="content"
            placeholder="내용을 입력하세요"
            value={newTask.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex align-items-center line row"
          style={{width: "100vw"}}>
          <div className="list-title col lefted">할 일 목록</div>
          <div className="setting-icon col righted">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTaskModal;