import React, { useState, useEffect } from 'react';
import instance from '../api/axios'
import '../styles/checkBox.css';
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Checkbox = ({ task, children, disabled, checked, onChange }) => {
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (task && task.taskStatus) {
      setIsCancelled(task.taskStatus === 'CANCELLED');
    }
  }, [task]);

  const updateTaskStatus = async (taskId, newStatus) => {
    console.log("updateTaskStatus taskId : ", taskId,);
    try {
      const response = instance.put(`/tasks/${taskId}/status`, {
        status: newStatus,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    } catch (error) {
      console.error('Error updateTaskStatus:', error);
    }
  }

  const handleChange = (isChecked) => {
    const newStatus = isChecked ? 'COMPLETED' : 'PENDING';
    if (task && task.no) {
      updateTaskStatus(task.no, newStatus);
      onChange(isChecked);
    } else {
      console.error('Task object is missing or task.no is undefined');
    };
  }

  const handleCancel = () => {
    const newStatus = 'CANCELLED';
    if (task && task.no) {
      updateTaskStatus(task.no, newStatus);
      setIsCancelled(true);
      onChange(false); // Optional: uncheck the checkbox if task is cancelled
    } else {
      console.error('Task object is missing or task.no is undefined');
    }
  }

  return (
    <label className="custom-checkbox">
      {/* <input
        type="checkbox"
        disabled={disabled}
        checked={checked && !isCancelled}
        onChange={(e) => handleChange(e.target.checked)}
      /> */}
      <span className={`custom-checkbox-icon ${disabled ? 'disabled' : ''}`}
        onClick={disabled ? null : handleChange}>
        {isCancelled ? <IoClose /> : (checked && <FaCheck />)}
      </span>
      {children}
      {/* {!isCancelled && <button onClick={handleCancel} disabled={disabled} style={{ marginLeft: '10px' }}>Cancel</button>} */}
    </label>
  );
}

export default Checkbox;