import React, { useState, useRef } from 'react';
import '../../styles/basicStyle.css';
import ReadTaskModal from '../task_state/readTaskModal';

const TaskBoxForCal = ({ task, read_date, read_task, read_description, read_listtitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const readTaskModalRef = useRef(null);

  const readMemo = () => {
    setIsModalOpen(true);
    if (readTaskModalRef.current) {
      readTaskModalRef.current.openModal();
    }
  };

  return (
    <div>
      <div className="TaskBoxForCal">
        <div className="color-box" onClick={readMemo}>
          <span className="repeat"><i className="fa-solid fa-repeat"></i></span>
          <span className="task">{task}</span>
        </div>
      </div>
      {isModalOpen && (
        <ReadTaskModal
          ref={readTaskModalRef}
          read_date={read_date}
          read_tasktitle={read_task}
          read_description={read_description}
          read_listtitle={read_listtitle}
        />
      )}
    </div>
  );
};

export default TaskBoxForCal;