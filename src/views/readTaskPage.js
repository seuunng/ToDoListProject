import React, { useState, useEffect } from 'react';
import '../styles/basicStyle.css';
import '../styles/readTaskPage.css';
import '../styles/datePickerModule.css';
import CheckBox from '../modules/checkBoxModule'
import { PiLineVerticalThin } from "react-icons/pi";
import { FaCalendarCheck } from "react-icons/fa";
import DatePickerModule from '../modules/datePickerModule';
import SetTask from '../components/task_state/setTask';
import SelectedList from '../components/task_list/selectedList.js';
import { TaskBoxProvider } from '../contexts/taskBoxContext.js';
//  BasicBoard 우측 메모 읽기 페이지
const ReadTaskPageContent = ({
  task,
  updateTask, deleteTask, lists, refreshTasks, 
  handleCancel, handleCheckboxChange, handleReopen
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskStatus, setTaskStatus] = useState(task.taskStatus);
  const [taskContent, setTaskContent] = useState(task.content);
  const [startDate, setStartDate] = useState(new Date(task.startDate));
  const [endDate, setEndDate] = useState(task.endDate ? new Date(task.endDate) : null);
  const [timeSetMap, setTimeSetMap] = useState({});
  const [selectedButton, setSelectedButton] = useState(task.dateStatus || 'DATE');
  const [selectedList, setSelectedList] = useState(null);

  const [checked, setChecked] = useState(task.taskStatus === 'COMPLETED');
  const [isCancelled, setIsCancelled] = useState(task.taskStatus === 'CANCELLED');

  useEffect(() => {
    if (task && task.title) {
      setTaskTitle(task.title);
      setTaskContent(task.content);
      setStartDate(new Date(task.startDate));
      setEndDate(task.endDate ? new Date(task.endDate) : null);
      setSelectedButton(task.dateStatus || 'DATE');
      setSelectedList(lists.find(list => list.no === task.listNo) || null);

      setChecked(task.taskStatus === 'COMPLETED');
      setIsCancelled(task.taskStatus === 'CANCELLED');

      setTimeSetMap((prevMap) => ({
        ...prevMap,
        [task.no]: task.isTimeSet || false,
      }));
    }
  }, [task, lists, setChecked, setIsCancelled]);
  // 데이터피커 숨기기 
  const handleDatePickerClose = async () => {
    try {
      const updatedTask = {
        ...task,
        startDate,
        endDate,
        taskStatus,
        dateStatus: selectedButton,
        isTimeSet: timeSetMap[task.no]
      };
      await updateTask(updatedTask);
      await refreshTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  // 리스트를 선택 기능
  const handleSelectedListChange = (selectedList) => {
    setSelectedList(selectedList);
    if (selectedList && selectedList.no) {
      updateTask({ ...task, listNo: selectedList.no });
    }
  };
  // 제목 변경 기능
  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    await updateTask({ ...task, title: newTitle });
    await refreshTasks(); 
  };
  // 설명 변경 기능
  const handleContentChange = async (e) => {
    const newContent = e.target.value;
    setTaskContent(newContent);
  };
  // 엔터키 입력하면 함수 실행
  const handleContentKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        await updateTask({ ...task, content: taskContent });
        await refreshTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };
  // 날짜 변경 기능
  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);

    let updatedStatus = task.taskStatus;

    const now = new Date();
    now.setHours(0, 0, 0, 0); 
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = endDate ? new Date(endDate) : null;
    if (end) {
      end.setHours(0, 0, 0, 0);
    }

    // 상태를 자동으로 계산
    if (task.taskStatus !== 'COMPLETED' && task.taskStatus !== 'CANCELLED' && task.taskStatus !== 'DELETED') {
      if (end && now <= end) {
        updatedStatus = 'PENDING';
      } else if (start && now < start) {
        updatedStatus = 'PENDING';
      } else if (start && now > start) {
        updatedStatus = 'OVERDUE'; 
      } else {
        updatedStatus = 'PENDING'; 
      }
    }
    setTaskStatus(updatedStatus);
  };
  // 기간|날짜 선택 기능
  const handleSelectedButtonChange = async (button) => {
    if (button !== task.dateStatus) {
      setSelectedButton(button);
    }
  };
  // 시간 입력 기능 
  const handleTimeSetChange = (task, value) => {
    setTimeSetMap((prevMap) => ({
      ...prevMap,
      [task.no]: value,
    }));
  };
  // 상태에 따른 스타일 적용을 위한 클래스네임
  const taskStatusClassName = task.taskStatus === 'OVERDUE'
    ? 'task-overdue'
    : task.taskStatus === 'COMPLETED'
      ? 'task-completed'
      : task.taskStatus === 'CANCELLED'
        ? 'task-cancelled'
        : '';

  return (
    <div className="readTaskPage">
      <div className="d-flex align-items-center">
        <CheckBox
          task={task}
          checked={checked}
          isCancelled={isCancelled}
          setChecked={setChecked}
          setIsCancelled={setIsCancelled}
          onChange={() => handleCheckboxChange(task.no)}
        />
        <PiLineVerticalThin style={{ marginLeft: "5px", marginRight: "5px" }} />
        <FaCalendarCheck onClick={() => setShowDatePicker(true)} />
        <DatePickerModule
          show={setShowDatePicker}
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
          onCalendarClose={handleDatePickerClose}
          selectedButton={selectedButton}
          setSelectedButton={handleSelectedButtonChange}
          isTaskBox={false}
          isTimeSet={timeSetMap[task.no] || false}
          setIsTimeSet={(value) => handleTimeSetChange(task, value)}
        />
      </div>
      <span className="task-title">
        <input
          type="text"
          value={taskTitle}
          onChange={handleTitleChange}
          className="form-control"
          placeholder="Task Title"
          style={{ border: "none" }}
        />
      </span>
      <div className="description">
        <textarea
          value={taskContent}
          onChange={handleContentChange}
          onKeyDown={handleContentKeyPress}
          className="form-control-readTask"
          placeholder="설명"
          style={{ border: "none" }}
        ></textarea>

        <div className="d-flex align-items-center line row">
          <div className="list-title col lefted">
            <SelectedList
              lists={lists}
              selectedList={selectedList}
              setSelectedList={handleSelectedListChange}
              tasks={task}
              updateTask={updateTask}
            />
          </div>
          <div className="setting-icon col righted">
            <SetTask
              task={task}
              deleteTask={deleteTask}
              className={`task-box ${taskStatusClassName}`}
              onReopen={() => handleReopen(task)}
              isCancelled={isCancelled}
              setIsCancelled={setIsCancelled}
              handleCancel={() => handleCancel(task)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const ReadTaskPage = (props) => (
  <TaskBoxProvider>
    <ReadTaskPageContent {...props} />
  </TaskBoxProvider>
);
export default ReadTaskPage;