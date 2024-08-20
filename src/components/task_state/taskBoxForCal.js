import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskBoxForCal.css';
import '../../styles/taskStatus.css';
import ReadTaskModal from '../task_state/readTaskModal';
// 캘린더용 테스크 박스(할일, 배경색)
const TaskBoxForCal = ({ 
  tasks, showdate, updateTask, deleteTask, className,
  lists, addList, updateList, deleteList, showTitle = true, style, refreshTasks,
  checked, setChecked, isCancelled, setIsCancelled, 
  handleCancel, handleCheckboxChange, handleReopen
 }) => {
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const readTaskModalRef = useRef(null);
  const taskBoxRef = useRef(null);

  useEffect(() => {
    if (tasks && tasks.title) {
      setTaskTitle(tasks.title);
    }
  }, []);

  useEffect(() => {
    const readMemo = (e) => {
      if (readTaskModalRef.current) {
        readTaskModalRef.current.openModal();
      }
    };
    const current = taskBoxRef.current;
    if (current) {
      current.addEventListener('click', readMemo);
    }
    return () => {
      if (current) {
        current.removeEventListener('click', readMemo);
      }
    };
  }, []);
  // 체크박스 상태에 따른 클래스네임 정의
  const taskStatusClassName = tasks.taskStatus === 'OVERDUE'
    ? 'task-overdue'
    : tasks.taskStatus === 'COMPLETED'
      ? 'task-completed'
      : tasks.taskStatus === 'CANCELLED'
        ? 'task-cancelled'
        : '';
  // 날짜 형식 기간 테스크박스의 스타일 수정을 위한 변수정의
  const TaskStartDate = new Date(tasks.startDate);
  const dateForStart = TaskStartDate.getDate();
  const isTaskStart = dateForStart === parseInt(showdate);

  return (
    <div className={`task-box ${className}`} style={style}>
      <div ref={taskBoxRef}
        // 테스크 상태에 따른 스타일을 위한 클래스 네임
        // dateStatus에 따른 스타일을 위한 클래스 네임
        className={`TaskBoxForCal ${taskStatusClassName} ${isTaskStart ? '' : 'false-Task'}`}>

        {/* 메모 반복 및 알림 설정여부 아이콘: 추후 구현 예정 */}
        {/* <div className="color-box row">
           {tasks.isRepeated!== 'NOREPEAT' && (
            <span className="taskBoxForCal-repeat col-2">
              <LuRepeat className={`task-box ${taskStatusClassName}`}/>
            </span>
          )} */}
        
        {/* 제목 */}
        {showTitle && (
          <span className={`task-title ${taskStatusClassName}`}
          style={{color: isTaskStart ? '': lists.color}}>
              {isTaskStart ? tasks.title : '.'}
          </span>
        )}
        {/* {(tasks.isNotified !== 'NOALARM')&& (
            <span className="taskBoxForCal-alram col-2">
              <FaRegBell className={`task-box ${taskStatusClassName}`}/>
            </span>
          )}
        </div> */}
      </div>
      <ReadTaskModal
        ref={readTaskModalRef}
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        lists={lists}
        addList={addList}
        updateList={updateList}
        deleteList={deleteList}
        task={tasks}
        checked={checked}
        setChecked={setChecked}
        isCancelled={isCancelled}
        setIsCancelled={setIsCancelled}
        handleCancel={handleCancel}
        handleCheckboxChange={handleCheckboxChange}
        refreshTasks={refreshTasks}
        handleReopen={handleReopen}
      />
    </div>
  );
};

export default TaskBoxForCal;