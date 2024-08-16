import React, { useState, useEffect } from 'react';
import instance from '../api/axios'
import '../styles/checkBox.css';
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Checkbox = ({ task, children, onChange, 
  // checked, setChecked, isCancelled, setIsCancelled 
}) => {

  const [checked, setChecked] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (task) {
      const isTaskCompleted = task.taskStatus === 'COMPLETED';
      const isTaskCancelled = task.taskStatus === 'CANCELLED';
      setChecked(isTaskCompleted);
      setIsCancelled(isTaskCancelled);
    }
  }, [task]);

  const handleCheckboxClick = () => {
    if (isCancelled) {
      setIsCancelled(false);
      setChecked(false);
    } else {
      setChecked(!checked);
    }
    onChange(); // 부모 컴포넌트의 상태도 업데이트합니다.
  };

  const taskStatusClassName = task.taskStatus === 'OVERDUE'
  ? 'task-overdue'
  : task.taskStatus === 'COMPLETED'
    ? 'task-completed'
    : task.taskStatus === 'CANCELLED'
      ? 'task-cancelled'
      : '';

  return (
    <label className="custom-checkbox">
      <span className={`custom-checkbox-icon ${taskStatusClassName}`}
        onClick={handleCheckboxClick} >
        {isCancelled ? <IoClose /> : (checked ? <FaCheck /> : null)}
      </span>
      {children}
    </label>
  );
}

export default Checkbox;