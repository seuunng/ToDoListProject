import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/simpleInputTask.css';
import { FaPlus } from "react-icons/fa";

const SimpleInputTask = ({ addTask, lists, listTitle, refreshTasks, listId, isSmartList }) => {
  const [newTask, setNewTask] = useState('');

  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
    "정각": "ONTIME",
    "5분전": "FIVEMINS",
    "30분전": "THIRTYMINS",
    "하루전": "DAYEARLY"
  };
  const initialAlarm = savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";

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

      const taskStartDate = new Date(today);
      let taskStatus;
      if (taskStartDate.getTime() < today.getTime()) {
          taskStatus = 'OVERDUE'; // 과거 날짜이면 OVERDUE
      } else {
          taskStatus = 'PENDING'; // 오늘 또는 미래 날짜이면 PENDING
      }
      
      const task = {
        title: newTask,
        content: '',
        isNotified: initialAlarm,
        isRepeated: 'NOREPEAT',
        startDate: today.toISOString(),
        endDate: '',
        priority: 'MEDIUM',
        taskStatus: taskStatus,
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