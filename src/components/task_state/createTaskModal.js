import React, { useState, useRef, useImperativeHandle, useEffect, forwardRef } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/createTask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, isValid } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';

const CreateTaskModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    showModal: handleShow,
  }));

  // useEffect(() => {
  //   if (props.date && isValid(new Date(props.date))) {
  //     setStartDate(new Date(props.date));
  //   } else {
  //     setStartDate(new Date()); // 기본 값으로 현재 날짜 설정
  //   }
  // }, [props.date]);

  // const formattedDate = format(new Date(props.date), 'yyyy-MM-dd');

  return (
    // <Modal show={show} onHide={handleClose} centered>
    //   <Modal.Header closeButton>
    //     <Button onClick={handleShow}>
    //       Create Task
    //     </Button>
    //     <div className="d-flex align-items-center">
    //       {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
    //     </div>
    //     <Button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></Button>
    //   </Modal.Header>
    //   <Modal.Body>
    <>
      <div className="d-flex align-items-center line">
        <span className="task-title">
          <input
            type="text"
            className="task-title-input"
            placeholder="할일을 입력하세요"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </span>
        <span className="flag-icon">
          <i className="fa-regular fa-flag"></i>
        </span>
      </div>
      <div className="description">
        <textarea
          className="description-input"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
    </>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <div className="d-flex align-items-center line">
    //       <span className="list-title"></span>
    //       <span className="setting-icon">
    //         <i className="fa-solid fa-ellipsis"></i>
    //       </span>
    //     </div>
    //     <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
    //     <button type="button" className="btn btn-primary">Save changes</button>
    //   </Modal.Footer>
    // </Modal>
  );
});

export default CreateTaskModal;