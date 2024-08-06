import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/readTaskModal.css';
import { Modal, Button } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import DatePickerModule from '../../modules/datePickerModule';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaCalendarCheck } from "react-icons/fa";
import Checkbox from '../../modules/checkBoxModule';
import { PiLineVerticalThin } from "react-icons/pi";
import SetTask from './setTask';
import SelectedList from '../task_list/selectedList.js';

const ReadTaskModal = forwardRef(({ tasks, updateTask, deleteTask,
  lists, addList, updateList, deleteList
 }, ref) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskDescription, setTaskDescription] = useState(tasks.content);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks.dateStatus || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || 'NOALARM');
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    setTaskTitle(tasks.title);
    setTaskDescription(tasks.content);
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setIsRepeat(tasks.isRepeated || 'NOREPEAT');
    setIsNotified(tasks.isNotified || 'NOALRAM');
    setSelectedList(lists.find(list => list.no === tasks.list.no) || null);
  }, [tasks,  lists]);
  
  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
  };
  const initialAlarm =savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";
  
  const handleClose = () => { 
    const updatedTask = {
      ...tasks,
      title: taskTitle,
      content: taskDescription,
      startDate,
      endDate,
      dateStatus: selectedButton
      // Add other task fields as necessary
    };
    updateTask(updatedTask);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  useImperativeHandle(ref, () => ({
    openModal: handleShow,
  }));

  const handleDateChange = (date) => {
    setStartDate(date);
    updateTask({ ...tasks, startDate: date });
  };
  const handleSelectedButtonChange = (button) => {
    setSelectedButton(button);
    updateTask({ ...tasks, dateStatus: button.toUpperCase() });
  }
  const handleRepeatClick = (option) => {
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
    updateTask(updatedTasks);
  };

  const handleAlarmClick = (option) => {
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
    updateTask(updatedTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClose();
    }
  };
  const handleSaveSettings = (settings) => {
    console.log("Saved settings:", settings);
    // 저장된 설정을 처리하는 로직 추가
};
// const handleOnHide = () => {
//   setShowDatePicker(false);
// };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className="d-flex align-items-center">
          <Checkbox />
          <PiLineVerticalThin style={{ marginLeft: "5px", marginRight: "5px" }} />
          <FaCalendarCheck />
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
            initialAlarm={initialAlarm}
            onSave={handleSaveSettings}
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center line">
          <span className="task-title">
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="form-control"
              placeholder="Task Title"
              style={{ border: "none" }}
              onKeyDown={handleKeyDown}
            />
          </span>
          {/* <span className="flag-icon">
            <i className="fa-regular fa-flag"></i>
          </span> */}
        </div>
        <div className="description">
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="form-control-readTask"
            placeholder="Task Description"
            style={{ border: "none" }}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex align-items-center line row"
          style={{ width: "100vw" }}>
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
        {/* <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
        <button type="button" className="btn btn-primary">Save changes</button> */}
      </Modal.Footer>
    </Modal>
  );
});

export default ReadTaskModal;