import React, { useState, useEffect } from 'react';
import '../styles/checkBox.css';
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
// 체크박스 상태를 나타내는 컴포넌트
const Checkbox = ({ task, children, onChange, 
}) => {
  const [checked, setChecked] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  // 할일의 상태에 따라 체크박스 상태 저장 
  useEffect(() => {
    if (task) {
      const isTaskCompleted = task.taskStatus === 'COMPLETED';
      const isTaskCancelled = task.taskStatus === 'CANCELLED';
      setChecked(isTaskCompleted);
      setIsCancelled(isTaskCancelled);
    }
  }, [task]);
  // 체크박스 클릭시 상태 수정
  const handleCheckboxClick = () => {
    if (isCancelled) {
      setIsCancelled(false);
      setChecked(false);
    } else {
      setChecked(!checked);
    }
    onChange();
  };
  // 할일의 상태에 따른 스타일 적용을 위한 클래스네임
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