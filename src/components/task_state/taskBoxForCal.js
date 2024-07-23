import React, { useState, useRef } from 'react';
import '../../styles/basicStyle.css';
import ReadTaskModal from '../task_state/readTaskModal';
import ModalModule from '../../modules/modalModule';

const TaskBoxForCal = ({ task, read_date, read_task, read_description, read_listtitle, style }) => {
  // const readTaskModalRef = useRef(null);
  const [showReadTask, setShowReadTask] = useState(false);

  const readMemo = () => {
    setShowReadTask(true);
  }

  return (
    <>
      <div className="TaskBoxForCal">
        <div className="color-box" onClick={readMemo} style={style}>
          <span className="repeat"><i className="fa-solid fa-repeat"></i></span>
          <span className="task">{task}</span>
        </div>
      </div>
    {showReadTask && (
        <ModalModule
          show={showReadTask}
          onHide={() => setShowReadTask(false)}
          context={
            <ReadTaskModal 
              read_tasktitle={read_task}
              read_description={read_description}
              read_listtitle={read_listtitle}
            />
          }
          btnTitle="닫기"
        />
      )}
    </>
  );
};

export default TaskBoxForCal;