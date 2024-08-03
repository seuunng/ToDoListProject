import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/simpleInputTask.css';
import { FaPlus } from "react-icons/fa";

const SimpleInputTask = ({ addTask , lists, listTitle, refreshTasks }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };

  const createTask = async () => {
    if (newTask.trim()) {
      const task = {
        title: newTask,
        content: '',
        isNotified: 'NOALARM',
        isRepeated: 'NOREPEAT',
        startDate: new Date().toISOString(),
        endDate: '',
        priority: 'MEDIUM',
        list: { no: lists.no }
      };
      await addTask(task); 
      setNewTask('');
      refreshTasks(); 
    }
  };
  return (
    <div className="simple-input-task">
    <div className="input-container">
      <input 
        type="text" 
        className="custom-input-simpleInputTask" 
        placeholder={`"${listTitle}" 에 할일을 추가하세요!`}
        value={newTask}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  </div>
  );
};

export default SimpleInputTask;