import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import { Modal, Button } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ReadTaskModal = forwardRef(({ /*read_date,*/ read_tasktitle, read_description, read_listtitle }, ref) => {
  const [show, setShow] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [startDate, setStartDate] = useState(new Date());

  // useEffect(() => {
  //   if (isValid(new Date(read_date))) {
  //     setFormattedDate(format(new Date(read_date), 'yyyy-MM-dd'));
  //   } else {
  //     setFormattedDate('Invalid Date');
  //   }
  // }, [read_date]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    openModal: handleShow,
  }));

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className="d-flex align-items-center">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(formattedDate(date))} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center line">
          {/* <span className="task-title">
          <h4>{read_tasktitle}title</h4>
        </span> */}
          <span className="flag-icon">
            <i className="fa-regular fa-flag"></i>
          </span>
        </div>
        <div className="description">{read_description}내용</div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex align-items-center line row"
          style={{ width: "100vw" }}>
          <div className="list-title col lefted">할 일 목록</div>
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