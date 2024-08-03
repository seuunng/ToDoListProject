import React, { useState, useRef, useImperativeHandle, useEffect, forwardRef } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/createTask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DatePicker from '../../modules/datePickerModule';

import 'react-datepicker/dist/react-datepicker.css';
import { format, isValid } from 'date-fns';
import { Modal, Button } from 'react-bootstrap';
import { FaCalendarCheck } from "react-icons/fa";
import ko from 'date-fns/locale/ko';
import Checkbox from '../../modules/checkBoxModule';
import { PiLineVerticalThin } from "react-icons/pi";
import { useSettings } from '../../context/SettingsContext';
import SetTask from './setTask';
import SelectedList from '../task_list/selectedList.js';

const CreateTaskModal = forwardRef((props, ref) => {
  const { addTask, date, tasks = {}, updateTask, deleteTask, lists = [], } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // 날짜 유효성 검증 함수
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  const [startDate, setStartDate] = useState(isValidDate(new Date(tasks.startDate)) ? new Date(tasks.startDate) : new Date());
  const [endDate, setEndDate] = useState(isValidDate(new Date(tasks.endDate)) ? new Date(tasks.endDate) : null);
  const [selectedButton, setSelectedButton] = useState(tasks?.dateStatus || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks?.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks?.isNotified || 'NOALRAM');

  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
    startDate: date,
    list: null,
  });
  const [selectedList, setSelectedList] = useState(null);
  const { selectedOptions, switches } = useSettings();
  // console.log(" CreateTaskModal lists", lists)
  useEffect(() => {
    if (show) {
      initializeTaskState();
      setNewTask(prevState => ({
        ...prevState,
        startDate: date,
        list: selectedList,
      }));
      console.log("NewTask", newTask)
      console.log("selectedList", selectedList)
      setStartDate(date);
    }
  }, [show, date, selectedList]);

  const handleClose = () =>  {
    if (newTask.title.trim()) {
      addTask(newTask);
    }
    setShow(false);
  };

  const handleShow = () => {
    setNewTask({
      title: '',
      content: '',
      startDate: date,
      isNotified: switches?.today ? 'ALARM' : 'NOALARM',
      isRepeated: 'NOREPEAT',
      list: selectedList,
    });
    setStartDate(date)
    setShow(true);
  };

  useImperativeHandle(ref, () => ({
    showModal: handleShow,
  }));

  const createTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({
        title: '',
        content: '',
        startDate: date,
        isNotified: switches?.today ? 'ALARM' : 'NOALARM', // 기본 알람 여부 초기화
        isRepeated: 'NOREPEAT',
        endDate: '',
        list: null,
        
      });
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setNewTask(prevState => ({
      ...prevState,
      startDate: date
    }));
  };
  
  const initializeTaskState = () => {
    if (tasks && lists.length > 0) {
      setStartDate(isValidDate(new Date(tasks.startDate)) ? new Date(tasks.startDate) : new Date());
      setEndDate(isValidDate(new Date(tasks.endDate)) ? new Date(tasks.endDate) : null);
      setSelectedButton(tasks.dateStatus || 'DATE');
      setIsRepeat(tasks.isRepeated || 'NOREPEAT');
      setIsNotified(tasks.isNotified || 'NOALARM');
      setSelectedList(selectedList || null);
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
  const handleSelectedButtonChange = (button) => {
    setSelectedButton(button);
    updateTask({ ...tasks, dateStatus: button.toUpperCase() });
  }
  useEffect(() => {
    setNewTask(prevState => ({
      ...prevState,
      list: selectedList,
    }));
  }, [selectedList]);
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
          <FaCalendarCheck />
          <DatePicker 
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
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center line">
          <span className="task-title">
            <input
              type="text"
              name="title"
              className="task-title-input"
              placeholder="할일을 입력하세요"
              value={newTask.title}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </span>
          {/* <span className="flag-icon">
          <i className="fa-regular fa-flag"></i>
        </span> */}
        </div>
        <div className="description">
          <textarea
            className="description-input"
            name="content"
            placeholder="내용을 입력하세요"
            value={newTask.content}
            onChange={handleInputChange}
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
            tasks={newTask}
            updateTask={addTask}
             />
            </div>
          <div className="setting-icon col righted">
            <SetTask
              task={tasks}
              deleteTask={deleteTask} />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTaskModal;