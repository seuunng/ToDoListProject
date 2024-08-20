import React, { useEffect, useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskCont.css';
import TaskBox from '../task_state/taskBox';

//테스크박스 모음 컨데이너
const TaskCont = ({
  tasks = [], updateTask, deleteTask, onTaskClick,
  lists, addList, updateList, deleteList, refreshTasks,
  checked, setChecked, isCancelled, setIsCancelled, handleCancel, handleCheckboxChange, handleReopen
}) => {
  //task의 배열 여부 확인
  if (!Array.isArray(tasks)) {
    console.error("Tasks is not an array:", tasks);
    return null;
  }
  //taskStatus의 우선순위 정의
  const statusPriority = {
    'OVERDUE': 1,
    'PENDING': 2,
    'COMPLETED': 3
  };
  // tasks 배열 정렬
  const sortedTasks = tasks.sort((a, b) => {
    // Status 우선순위 비교
    const statusOrder = statusPriority[a.taskStatus] - statusPriority[b.taskStatus];
    if (statusOrder !== 0) return statusOrder;
    // Status가 같다면 날짜순 정렬 (최신순)
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return dateA - dateB; // 최신 날짜가 먼저 나오도록 내림차순
  });

  return (
    <div className="TaskContTable">
      <table className="task-table">
        <tbody>
          {sortedTasks.map((task) => (
            <tr key={task.no}>
              <td className="task-cell" onClick={() => onTaskClick(task)}>
                <TaskBox
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                  lists={lists}
                  addList={addList}
                  updateList={updateList}
                  deleteList={deleteList}
                  refreshTasks={refreshTasks}
                  checked={checked}
                  setChecked={setChecked}
                  isCancelled={isCancelled}
                  setIsCancelled={setIsCancelled}
                  handleCancel={handleCancel}
                  handleCheckboxChange={handleCheckboxChange}
                  handleReopen={handleReopen}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskCont;