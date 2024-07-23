import React, { useState, useRef } from 'react';
import '../../styles/basicStyle.css';
import ReadTaskModal from '../task_state/readTaskModal';

const TaskBoxForCal = ({ task, read_date, read_task, read_description, read_listtitle, style }) => {
  const [showReadTask, setShowReadTask] = useState(false);
  const readTaskModalRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const readMemo = () => {
    setShowReadTask(true);
    if (readTaskModalRef.current) {
      readTaskModalRef.current.openModal();
    }
  }

  return (
    <>
      <div className="TaskBoxForCal">
        <div className="color-box" onClick={readMemo} style={style}>
          <span className="repeat"><i className="fa-solid fa-repeat"></i></span>
          <span className="task">{task}</span>
        </div>
      </div>
        <ReadTaskModal
          ref={readTaskModalRef} 
          read_tasktitle={read_task}
          read_description={read_description}
          read_listtitle={read_listtitle}
        />
      
    </>
  );
};

export default TaskBoxForCal;