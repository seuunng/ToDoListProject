import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/simpleInputTask.css';
import { FaPlus } from "react-icons/fa";

const SimpleInputTask = ({ listTitle, onTaskCreated }) => {
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
      const task = { id: Date.now(), text: newTask, date: new Date().toISOString().split('T')[0] };
      onTaskCreated(task);
      setNewTask('');
    }
  };

  return (
    <div className="simple-input-task">
    <div className="input-container">
      <input 
        type="text" 
        className="custom-input" 
        placeholder={` ${listTitle}에 할일을 추가하세요!`}
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  </div>
  );
};

export default SimpleInputTask;