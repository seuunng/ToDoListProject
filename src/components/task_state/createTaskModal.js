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
  const { addTask, date, tasks = {}, deleteTask, lists = [], } = props;

  //입력된 날짜가 유효한지 확인
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  
  //DatePicker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedButton, setSelectedButton] = useState(tasks?.dateStatus || 'DATE');
  const [startDate, setStartDate] = useState(isValidDate(new Date(tasks.startDate)) ? new Date(tasks.startDate) : new Date());
  const [endDate, setEndDate] = useState(isValidDate(new Date(tasks.endDate)) ? new Date(tasks.endDate) : null);
  const [isRepeat, setIsRepeat] = useState(tasks?.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks?.isNotified || 'NOALRAM');
  //Setting모달 설정값
  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
  };
  const initialAlarm =savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";
  
  console.log("4 initialAlarm", initialAlarm);  

  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
    startDate: date,
    endDate: null,
    isNotified: 'NOALARM',
    isRepeated: 'NOREPEAT',
    dateStatus: 'DATE',
    list: null,
  });
  const [selectedList, setSelectedList] = useState(null);
  // const { selectedOptions, switches } = useSettings();
  // console.log(" CreateTaskModal lists", lists)

  useEffect(() => {
    if (show) {
      initializeTaskState();
      setNewTask(prevState => ({
        ...prevState,
        startDate: date,
        list: selectedList,
      }));
      setStartDate(date);
    }
  }, [show, date, selectedList]);

  useEffect(() => {
    setNewTask(prevState => ({
      ...prevState,
      list: selectedList,
    }));
  }, [selectedList]);
  
  useEffect(() => {
    setNewTask(prevState => ({
      ...prevState,
      isNotified: isNotified,
    }));
  }, [isNotified]);

  //모달 열릴때 모달 데이터
  const handleShow = () => {
    setNewTask({
      title: '',
      content: '',
      startDate: date,
      endDate: null,
      isNotified: isNotified,
      isRepeated: 'NOREPEAT',
      dateStatus: 'DATE',
      list: selectedList,
    });
    // setStartDate(date)
    setShow(true);
  };

  //입력필드 값이 변경될때 newTask상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  //날짜 입력필드 변경
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setNewTask(prevState => ({
      ...prevState,
      startDate: start,
      endDate: end
    }));
  };
  //반복 선택 변경
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
    setNewTask(prevState => ({
      ...prevState,
      isRepeated: isRepeated,
    }));
  };
  //알림 선택 변경
  const handleAlarmClick = (option) => {
    const alarmMapping = {
      "알림없음": "NOALARM",
      "정각": "ONTIME",
      "5분전": "FIVEMINS",
      "30분전": "THIRTYMINS",
      "하루전": "DAYEARLY"
    };
    const isNotified = alarmMapping[option] || "NOALARM";
    setIsNotified(isNotified);
    setNewTask(prevState => ({
      ...prevState,
      isNotified: isNotified,
    }));
  };
  //엔터 입력시 메모저장
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      createTask();
    }
  };
  //모달 종료+메모 저장
  const handleClose = () => {
    if (newTask.title.trim()) {
      addTask(newTask);
    }
    setShow(false);
  };
  //메모 저장
  const createTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({
        title: '',
        content: '',
        startDate: date,
        isNotified: 'NOALARM',
        isRepeated: 'NOREPEAT',
        dateStatus: 'DATE',
        endDate: '',
        list: null,

      });
      handleClose();
    }
  };

  useImperativeHandle(ref, () => ({
    showModal: handleShow,
  }));


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

  const handleSelectedButtonChange = (button) => {
    setSelectedButton(button);
    setNewTask(prevState => ({
      ...prevState,
      dateStatus: button.toUpperCase()
    }));
  }



  // const handleSaveSettings = (settings) => {
  //   console.log("Saved settings:", settings);
  //   // 저장된 설정을 처리하는 로직 추가
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
            initialAlarm={initialAlarm}
            // onSave={handleSaveSettings}
            isNotified={isNotified}
            setIsNotified={setIsNotified}
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