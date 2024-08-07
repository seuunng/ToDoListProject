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
import { TaskBoxProvider, useTaskBox   } from '../contexts/taskBoxContext.js';

const ReadTaskPageContent = ({ tasks, updateTask, deleteTask,
  lists, addList, updateList, deleteList, refreshTasks
 }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskContent, setTaskContent] = useState(tasks.content);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks.dateStatus || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || 'NOALRAM');
  const [selectedList, setSelectedList] = useState(null);
  const { setIsTaskBox } = useTaskBox();
  
  useEffect(() => {
    setTaskTitle(tasks.title);
    setTaskContent(tasks.content);
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setIsRepeat(tasks.isRepeated || 'NOREPEAT');
    setIsNotified(tasks.isNotified || 'NOALRAM');
    setSelectedList(lists.find(list => list.no === tasks.listNo) || null);
  }, [tasks, lists]);

  useEffect(() => {
    if (tasks && tasks.list && tasks.list.no) {
      console.log("Task List No:", tasks.list.no);
    }
  }, [tasks]);

  useEffect(() => {
    setIsTaskBox(false);
    return () => setIsTaskBox(false);
  }, [setIsTaskBox]);
  
  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    await updateTask({ ...tasks, title: newTitle });
    await refreshTasks(); 
  };

  const handleContentChange = async (e) => {
    const newContent = e.target.value;
    setTaskContent(newContent);
    await updateTask({ ...tasks, content: newContent });
    await refreshTasks(); 
  };

  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    await updateTask({ ...tasks, startDate, endDate });
    await refreshTasks(); 
  };

  const handleSelectedButtonChange = async (button) => {
    setSelectedButton(button);
    await updateTask({ ...tasks, dateStatus: button.toUpperCase() });
    await refreshTasks(); 
  };
  const handleRepeatClick = async (option) => {
    const repeatMapping = {
      "반복없음": "NOREPEAT",
      "매일": "DAILY",
      "매주": "WEEKLY",
      "매달": "MONTHLY",
      "매년": "YEARLY"
    };
    const isRepeated = repeatMapping[option] || "NOREPEAT";
    setIsRepeat(isRepeated);
    const updatedTasks = { ...tasks, isRepeated:  isRepeated };
    await updateTask(updatedTasks);
    await  refreshTasks(); 
  };

  const handleAlarmClick =async  (option) => {
    const alarmMapping = {
      "알림없음": "NOALRAM",
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
    };
    const isNotified = alarmMapping[option] || "NOALRAM";
    setIsNotified(isNotified);
    const updatedTasks = { ...tasks, isNotified: isNotified };
    await  updateTask(updatedTasks);
    await refreshTasks(); 
  };
  
  const handleSaveSettings = (settings) => {
    console.log("Saved settings:", settings);
    // 저장된 설정을 처리하는 로직 추가
};
// const handleOnHide = () => {
//   setShowDatePicker(false);
// };
  return (
    <div className="readTaskPage">
      <div className="d-flex align-items-center">
        <CheckBox />
        <PiLineVerticalThin style={{ marginLeft: "5px", marginRight: "5px" }} />
        <FaCalendarCheck onClick={() => setShowDatePicker(true)} />
        <DatePickerModule
          onHide={() => setShowDatePicker(false)}
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
          onRepeatClick={handleRepeatClick}
          onAlarmClick={handleAlarmClick}
          selectedButton={selectedButton}
          setSelectedButton={handleSelectedButtonChange}
          initialRepeat={isRepeat}
          initialAlram={isNotified}
          onSave={handleSaveSettings}
          isTaskBox={false}
        />
      </div>
      {/* <i className="fa-regular fa-flag"></i> */}
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
            tasks={tasks}
            updateTask={updateTask}
             />
            </div>
          <div className="setting-icon col righted">
            <SetTask
              task={tasks}
              deleteTask={deleteTask} />
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