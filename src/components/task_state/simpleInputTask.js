import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/simpleInputTask.css';
//BasicBoard 상단 간단 메모입력 창
const SimpleInputTask = ({ addTask, listTitle, refreshTasks, listId, isSmartList }) => {
  const [newTask, setNewTask] = useState('');
  const selectedList = JSON.parse(localStorage.getItem('selectedList'));
  const defaultList = JSON.parse(localStorage.getItem('defaultList'));
  // 입력내용 변경
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };
  // 엔터 입력시 메모 저장
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };
  // 메모 저장 기능
  const createTask = async () => {
    if (newTask.trim()) {
      // 날짜에 따른 메모 체크박스 상태 설정
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskStartDate = new Date(today);
      let taskStatus;
      if (taskStartDate.getTime() < today.getTime()) {
          taskStatus = 'OVERDUE'; 
      } else {
          taskStatus = 'PENDING'; 
      }
      const task = {
        title: newTask,
        content: '',
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