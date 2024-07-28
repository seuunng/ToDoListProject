import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskBoxForCal.css';
import ReadTaskModal from '../task_state/readTaskModal';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";

const TaskBoxForCal = ({ tasks, updateTask, deleteTask, className, showTitle=true}) => {
  const readTaskModalRef = useRef(null);
  const taskBoxRef = useRef(null);

  useEffect(() => {
    const readMemo = (e) => {
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
    <div className={`task-box ${className}`}>
      <div ref={taskBoxRef} 
        className="TaskBoxForCal">
        <div className="color-box row">
           {tasks.isRepeated && (
            <span className="repeat col-2">
              <LuRepeat />
            </span>
          )}
          {showTitle && (
            <span className="task-title col-8">{tasks.title}</span>
          )}
          {tasks.isNotified && (
            <span className="alram col-2">
              <FaRegBell />
            </span>
          )}
        </div>
      </div>
      <ReadTaskModal
        ref={readTaskModalRef}
        tasks={tasks} 
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TaskBoxForCal;