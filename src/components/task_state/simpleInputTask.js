import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/simpleInputTask.css';
import { FaPlus } from "react-icons/fa";

const SimpleInputTask = ({ addTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };

  const createTask = () => {
    if (newTask.trim()) {
      const task = {
        title: newTask,
        content: '',
        isNotified: 'NOALRAM',
        isRepeated: 'NOREPEAT',
        startDate: new Date().toISOString(),
        endDate: '',
        priority: 'MEDIUM',
        taskStatus: 'PENDING'
      };
      addTask(task);
      setNewTask('');
    }
  };

  return (
    <div className="simple-input-task">
    <div className="input-container">
      <input 
        type="text" 
        className="custom-input-simpleInputTask" 
        placeholder={` {리스트제목}에 할일을 추가하세요!`}
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  </div>
  );
};

export default SimpleInputTask;