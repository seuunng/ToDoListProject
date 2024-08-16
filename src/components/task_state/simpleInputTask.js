import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/simpleInputTask.css';
import { FaPlus } from "react-icons/fa";

const SimpleInputTask = ({ addTask, lists, listTitle, refreshTasks, listId, isSmartList }) => {
  const [newTask, setNewTask] = useState('');

  const selectedList = JSON.parse(localStorage.getItem('selectedList'));
  const defaultList = JSON.parse(localStorage.getItem('defaultList'));
  
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

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const task = {
        title: newTask,
        content: '',
        isNotified: 'NOALARM',
        isRepeated: 'NOREPEAT',
        startDate: today.toISOString(),
        endDate: '',
        priority: 'MEDIUM',
        taskStatus: 'PENDING',
        listNo: isSmartList ? selectedList.no : listId,
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
          placeholder={`"${isSmartList ? selectedList.title : listTitle}" 에 할일을 추가하세요!`}
          value={newTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SimpleInputTask;