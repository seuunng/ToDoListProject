import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskBoxForCal.css';
import '../../styles/taskStatus.css';
import ReadTaskModal from '../task_state/readTaskModal';
import { LuRepeat } from "react-icons/lu";
import { FaRegBell } from "react-icons/fa";
import instance from '../../api/axios';

const TaskBoxForCal = ({ tasks, updateTask, deleteTask, className, 
  lists, addList, updateList, deleteList, showTitle=true, style, refreshTasks,
  checked,  setChecked,  isCancelled,  setIsCancelled,  handleCancel,  handleCheckboxChange,handleReopen }) => {
  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
  };
  const initialAlarm =savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";
  
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || 'NOALARM');
  const [taskTitle, setTaskTitle] = useState(tasks.title);

  const readTaskModalRef = useRef(null);
  const taskBoxRef = useRef(null);
  const listNo = tasks.list ? tasks.list.no : null;
  useEffect(() => {
    if (tasks && tasks.title) {
      setTaskTitle(tasks.title);
      setIsRepeat(tasks.isRepeated || 'NOREPEAT');
      setIsNotified(tasks.isNotified || 'NOALARM');
    }
  }, []);

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
  
  const taskStatusClassName = tasks.taskStatus === 'OVERDUE'
  ? 'task-overdue'
  : tasks.taskStatus === 'COMPLETED'
    ? 'task-completed'
    : tasks.taskStatus === 'CANCELLED'
      ? 'task-cancelled'
      : '';

  return (
    <div className={`task-box ${className}`}  style={style}>
      <div ref={taskBoxRef} 
        className={`TaskBoxForCal ${taskStatusClassName}`}>
        <div className="color-box row">
           {tasks.isRepeated!== 'NOREPEAT' && (
            <span className="taskBoxForCal-repeat col-2">
              <LuRepeat className={`task-box ${taskStatusClassName}`}/>
            </span>
          )}
          {showTitle && (
            <span className={`task-title col-8 ${taskStatusClassName}`}>{tasks.title}</span>
          )}
          {(tasks.isNotified !== 'NOALARM')&& (
            <span className="taskBoxForCal-alram col-2">
              <FaRegBell className={`task-box ${taskStatusClassName}`}/>
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
        task={tasks}
        checked={checked} 
        setChecked={setChecked}  
        isCancelled={isCancelled}
        setIsCancelled={setIsCancelled}
        handleCancel={handleCancel}
        handleCheckboxChange={handleCheckboxChange}
        refreshTasks={refreshTasks}
        handleReopen={handleReopen}
      />
    </div>
  );
};

export default TaskBoxForCal;