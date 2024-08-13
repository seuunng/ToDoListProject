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
  
  // useEffect(() => {
  //   // 상태가 변경될 때마다 로그를 출력하여 상태 변경을 확인
  //   console.log("Checkbox state updated: ", { checked, isCancelled });
  // }, [checked, isCancelled]);

  return (
    <label className="custom-checkbox">
      <span className="custom-checkbox-icon"
        onClick={onChange} >
        {isCancelled ? <IoClose /> : (checked ? <FaCheck /> : null)}
      </span>
      {children}
    </label>
  );
}

export default Checkbox;