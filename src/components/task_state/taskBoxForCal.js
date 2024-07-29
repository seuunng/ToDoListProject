import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskBoxForCal.css';
import ReadTaskModal from '../task_state/readTaskModal';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";

const TaskBoxForCal = ({ tasks, updateTask, deleteTask, className, 
  lists, addList, updateList, deleteList, showTitle=true, style }) => {
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
    <div className={`task-box ${className}`}  style={style}>
      <div ref={taskBoxRef} 
        className="TaskBoxForCal">
        <div className="color-box row">
           {tasks.isRepeated!== 'NOREPEAT' && (
            <span className="taskBoxForCal-repeat col-2">
              <LuRepeat />
            </span>
          )}
          {showTitle && (
            <span className="task-title col-8">{tasks.title}</span>
          )}
          {tasks.isNotified !== 'NOALRAM'&& (
            <span className="taskBoxForCal-alram col-2">
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
        lists={lists} 
        addList={addList} 
        updateList={updateList}
        deleteList={deleteList}
      />
    </div>
  );
};

export default TaskBoxForCal;