import React, { useState, useEffect } from 'react';
import instance from '../api/axios'
import '../styles/checkBox.css';
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Checkbox = ({ task, children, onChange, checked, setChecked, isCancelled, setIsCancelled }) => {
  // const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (task) {
      setChecked(task.taskStatus === 'COMPLETED');
      setIsCancelled(task.taskStatus === 'CANCELLED');
    }
    // console.log(task.taskStatus);
    // console.log(checked);
  }, [task]);

  // const updateTaskStatus = async (taskId, newStatus) => {
  //   try {
  //     const response = await instance.put(`/tasks/${taskId}/status`, {
  //       status: newStatus,
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     });
  //     return response;
  //   } catch (error) {
  //     console.error('Error updateTaskStatus:', error);
  //     throw error; 
  //   }
  // }

  // const handleChange = async () => {
  //   let newStatus;
  //   if (checked) { 
  //     const today = new Date();
  //     const taskDueDate = new Date(task.startDate);
  //     if (taskDueDate < today) {
  //       newStatus = 'OVERDUE';
  //     } else {
  //       newStatus = 'PENDING';
  //     }
  //   } else {
  //     newStatus = 'COMPLETED';
  //   }

  //   setChecked(!checked); 
  //   setIsCancelled(newStatus === 'CANCELLED');
  //   try {
  //     const response = await updateTaskStatus(task.no, newStatus); // 응답이 완료될 때까지 대기
  //   } catch (error) {
  //     console.error('Error updating task status:', error);
  //   }
  // }

  // const handleCancel = () => {
  //   const newStatus = 'CANCELLED';
  //   if (task && task.no) {
  //     updateTaskStatus(task.no, newStatus).then(() => {
  //     });
  //   } else {
  //     console.error('Task object is missing or task.no is undefined');
  //   }
  // }

  return (
    <label className="custom-checkbox">
      <span className="custom-checkbox-icon"
        onClick={onChange} >
        {isCancelled ? <IoClose /> : (checked && <FaCheck />)}
      </span>
      {children}
    </label>
  );
}

export default Checkbox;