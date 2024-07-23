import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskBoxForCal.css';
import ReadTaskModal from '../task_state/readTaskModal';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";

const TaskBoxForCal = ({ task, read_date, read_task, read_description, read_listtitle, style }) => {
  const readTaskModalRef = useRef(null);
  const taskBoxRef = useRef(null);

  useEffect(() => {
    const readMemo = (e) => {
      // console.log("TaskBoxForCal clicked", e); // 이벤트 객체 로그 추가
      // e.stopPropagation();
      if (readTaskModalRef.current) {
        readTaskModalRef.current.openModal();
      }
    };
    
    const current = taskBoxRef.current;
    if (current) {
      current.addEventListener('click', readMemo);
    }

    return () => {
      if (current) {
        current.removeEventListener('click', readMemo);
      }
    };
  }, []);

  return (
    <>
      <div ref={taskBoxRef} 
        className="TaskBoxForCal">
        <div className="color-box row" style={style}>
          <span className="repeat col-2"><LuRepeat /></span>
          <span className="taskc col-7">{task}</span>
          <span className="alram col-3 "><FaRegBell /></span>
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