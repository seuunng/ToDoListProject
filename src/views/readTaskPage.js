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
import { TaskBoxProvider, useTaskBox } from '../contexts/taskBoxContext.js';

const ReadTaskPageContent = ({
  task,
  updateTask, deleteTask, lists, refreshTasks, onTaskClick,
  // checked,  setChecked,  isCancelled,  setIsCancelled,
  handleCancel, handleCheckboxChange
}) => {
  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
    "정각": "ONTIME",
    "5분전": "FIVEMINS",
    "30분전": "THIRTYMINS",
    "하루전": "DAYEARLY"
  };
  const initialAlarm = savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskContent, setTaskContent] = useState(task.content);
  const [startDate, setStartDate] = useState(new Date(task.startDate));
  const [endDate, setEndDate] = useState(task.endDate ? new Date(task.endDate) : null);
  const [timeSetMap, setTimeSetMap] = useState({});
  const [selectedButton, setSelectedButton] = useState(task.dateStatus || 'DATE');
  const [isRepeat, setIsRepeat] = useState(task.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(task.isNotified || initialAlarm);
  const [selectedList, setSelectedList] = useState(null);

  const [checked, setChecked] = useState(task.taskStatus === 'COMPLETED');
  const [isCancelled, setIsCancelled] = useState(task.taskStatus === 'CANCELLED');

  useEffect(() => {
    setTaskTitle(task.title);
    setTaskContent(task.content);
    setStartDate(new Date(task.startDate));
    setEndDate(task.endDate ? new Date(task.endDate) : null);
    setSelectedButton(task.dateStatus || 'DATE');
    setIsRepeat(task.isRepeated || 'NOREPEAT');
    setIsNotified(task.isNotified || initialAlarm);
    setSelectedList(lists.find(list => list.no === task.listNo) || null);

    setChecked(task.taskStatus === 'COMPLETED');
    setIsCancelled(task.taskStatus === 'CANCELLED');

    setTimeSetMap((prevMap) => ({
      ...prevMap,
      [task.no]: task.isTimeSet || false, // Task별로 isTimeSet 상태를 초기화
    }));
  }, [task, lists, setChecked, setIsCancelled]);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    await updateTask({ ...task, title: newTitle });
    await refreshTasks();
  };

  const handleContentChange = async (e) => {
    const newContent = e.target.value;
    setTaskContent(newContent);
    await updateTask({ ...task, content: newContent });
    await refreshTasks();
  };

  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);

    let updatedStatus = task.taskStatus;

    const now = new Date();
    now.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화하여 날짜 비교만 수행하도록 설정
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = endDate ? new Date(endDate) : null;
    if (end) {
      end.setHours(0, 0, 0, 0);
    }

    // 상태를 자동으로 계산
    if (task.taskStatus !== 'COMPLETED' && task.taskStatus !== 'CANCELLED' && task.taskStatus !== 'DELETED') {
      if (end && now <= end) {
        updatedStatus = 'PENDING'; // 마감 기한이 지난 경우
      } else if (start && now < start) {
        updatedStatus = 'PENDING'; // 미래의 시작일인 경우
      } else if (start && now > start) {
        updatedStatus = 'OVERDUE'; // 시작일이 과거인 경우
      } else {
        updatedStatus = 'PENDING'; // 그 외의 경우는 PENDING
      }
    }
    const updatedTask = { ...task, startDate, endDate, taskStatus: updatedStatus };
    await updateTask(updatedTask);
    await refreshTasks();
  };

  useEffect(() => {
      console.log("1 selectedButton:", selectedButton);
      console.log("1-1task.dateStatus:", task.dateStatus);
      // console.log("1-2 Selected button has changed to:", button.toUpperCase());
  }, [selectedButton]);

  const handleSelectedButtonChange = async (button) => {
    if (button!== task.dateStatus) {
      console.log("2 button:", button);
      console.log("2-1 task.dateStatus:", task.dateStatus);
    setSelectedButton(button);
    await updateTask({ ...task, dateStatus: button.toUpperCase() });
    await refreshTasks();
    }
  };

  const handleRepeatClick = (option) => {
    const repeatMapping = {
      "반복없음": "NOREPEAT",
      "매일": "DAILY",
      "매주": "WEEKLY",
      "매달": "MONTHLY",
      "매년": "YEARLY"
    };
    const isRepeated = repeatMapping[option] || "NOREPEAT";
    const updatedTask = { ...task, isRepeated: isRepeated };
    updateTask(updatedTask);
  };

  const handleAlarmClick = async (option) => {
    const alarmMapping = {
      "알림없음": "NOALARM",
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
    };
    const isNotified = alarmMapping[option] || "NOALARM";
    setIsNotified(isNotified);
    const updatedTask = { ...task, isNotified: isNotified };
    await updateTask(updatedTask);
    // await refreshTasks();
  };


  const handleTimeSetChange = (task, value) => {
    setTimeSetMap((prevMap) => ({
      ...prevMap,
      [task.no]: value,
    }));
    updateTask({
      ...task,
      isTimeSet: value,
    });
  };

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
          onRepeatClick={handleRepeatClick}
          onAlarmClick={handleAlarmClick}
          selectedButton={selectedButton}
          setSelectedButton={handleSelectedButtonChange}
          initialRepeat={isRepeat}
          initialAlarm={initialAlarm}
          isNotified={isNotified}
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
          className="form-control-readTask"
          placeholder="설명"
          style={{ border: "none" }}
        ></textarea>

        <div className="d-flex align-items-center line row">
          <div className="list-title col lefted">
            <SelectedList
              lists={lists}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              tasks={task}
              updateTask={updateTask}
            />
          </div>
          <div className="setting-icon col righted">
            <SetTask
              task={task}
              deleteTask={deleteTask}
              handleCancel={handleCancel}
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