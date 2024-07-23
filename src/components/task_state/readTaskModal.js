import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import { Modal, Button } from 'react-bootstrap';
import { format, isValid } from 'date-fns';

const ReadTaskModal = forwardRef(({ /*read_date,*/ read_tasktitle, read_description, read_listtitle }, ref) => {
  // const [show, setShow] = useState(false);
  // const [formattedDate, setFormattedDate] = useState('');

  // useEffect(() => {
  //   if (isValid(new Date(read_date))) {
  //     setFormattedDate(format(new Date(read_date), 'yyyy-MM-dd'));
  //   } else {
  //     setFormattedDate('Invalid Date');
  //   }
  // }, [read_date]);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // useImperativeHandle(ref, () => ({
  //   openModal: handleShow,
  // }));

  return (
    <>
      <div className="d-flex align-items-center line">
        <span className="task-title">
          <h4>{read_tasktitle}title</h4>
        </span>
        <span className="flag-icon">
          <i className="fa-regular fa-flag"></i>
        </span>
      </div>
      <div className="description">{read_description}내용</div>
    </>
  );
});

export default ReadTaskModal;