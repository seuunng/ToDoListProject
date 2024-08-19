import React, { useState, useRef, useImperativeHandle, useEffect, forwardRef } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/createTask.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import DatePicker from '../../modules/datePickerModule';

import 'react-datepicker/dist/react-datepicker.css';
import { Modal } from 'react-bootstrap';
import { FaCalendarCheck } from "react-icons/fa";
import SetTask from './setTask';
import SelectedList from '../task_list/selectedList.js';

const CreateTaskModal = forwardRef((props, ref) => {
  const { addTask, date, tasks = {}, deleteTask, lists = [], } = props;

  //입력된 날짜가 유효한지 확인
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  //Setting모달 설정값
  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
    "정각": "ONTIME",
    "5분전": "FIVEMINS",
    "30분전": "THIRTYMINS",
    "하루전": "DAYEARLY"
  };
  const initialAlarm = savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";

  //DatePicker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedButton, setSelectedButton] = useState(tasks?.dateStatus || 'DATE');
  const [startDate, setStartDate] = useState(isValidDate(new Date(tasks.startDate)) ? new Date(tasks.startDate) : new Date());
  const [endDate, setEndDate] = useState(isValidDate(new Date(tasks.endDate)) ? new Date(tasks.endDate) : null);
  const [timeSetMap, setTimeSetMap] = useState({});
  const [isRepeat, setIsRepeat] = useState(tasks?.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(initialAlarm || 'NOALARM');

  const getStoredItem = (key) => {
    try {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : null;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage`, error);
      return null;
    }
  };
  const selectedList_localSrotage = getStoredItem('selectedList');
  const defaultList = getStoredItem('defaultList');

  const [selectedList, setSelectedList] = useState(selectedList_localSrotage || defaultList);

  const [show, setShow] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
    startDate: date,
    endDate: null,
    isNotified: initialAlarm,
    isRepeated: 'NOREPEAT',
    dateStatus: 'DATE',
    listNo: selectedList?.no || '',
  });

  const initializeTaskState = () => {
    if (tasks && lists.length > 0) {
      setNewTask(prevState => ({
        ...prevState,
        startDate: isValidDate(new Date(tasks.startDate)) ? new Date(tasks.startDate) : new Date(),
        endDate: null,
        dateStatus: tasks.dateStatus || 'DATE',
        isRepeated: tasks.isRepeated || 'NOREPEAT',
        isNotified: tasks.isNotified || initialAlarm,
        listNo: selectedList_localSrotage?.no || '',
      }));
      setTimeSetMap((prevMap) => ({
        ...prevMap,
        [tasks.no]: tasks.isTimeSet || false,
      }));
    }
  };

  useEffect(() => {
    if (show) {
      initializeTaskState();

      setSelectedList(selectedList_localSrotage);

      setStartDate(isValidDate(date) ? date : new Date());

      setNewTask(prevState => ({
        ...prevState,
        dateStatus: 'DATE',
        startDate: date,
        endDate: null,
        listNo: selectedList_localSrotage?.no || '',
      }));
      // setStartDate(date);
    }

  }, [show]);

  useEffect(() => {
    if (tasks.no && timeSetMap[tasks.no] !== (tasks.isTimeSet || false)) {
      setTimeSetMap((prevMap) => ({
        ...prevMap,
        [tasks.no]: tasks.isTimeSet || false,
      }));
    }
  }, [tasks, timeSetMap, tasks.no]);

  useEffect(() => {
    setNewTask(prevState => ({
      ...prevState,
      listNo: selectedList?.no || '',
    }));
  }, [selectedList]);

  //모달 열릴때 모달 데이터
  const handleShow = () => {
    setSelectedList(selectedList_localSrotage || defaultList);
    setNewTask({
      title: '',
      content: '',
      startDate: date,
      endDate: null,
      isNotified: isNotified,
      isRepeated: 'NOREPEAT',
      dateStatus: 'DATE',
      listNo: selectedList_localSrotage?.no || '',
      isTimeSet: false,
    });
    // setStartDate(date)
    setShow(true);
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

  const handleSelectedButtonChange = (button) => {
    setSelectedButton(button);
    setNewTask({ ...tasks, dateStatus: button.toUpperCase() });
  }

  const handleTimeSetChange = (task, value) => {

    setTimeSetMap((prevMap) => ({
      ...prevMap,
      [task.no]: value,
    }));

    setNewTask({
      ...tasks,
      isTimeSet: value,
    });

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

  //메모 저장
  const createTask = async () => {
    if (newTask.title && newTask.title.trim()) {

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let taskStatus;
      if (startDate.toISOString() < today.toISOString()) {
        taskStatus = 'OVERDUE'; // 과거 날짜이면 OVERDUE
      } else {
        taskStatus = 'PENDING'; // 오늘 또는 미래 날짜이면 PENDING
      }

      const task = {
        title: newTask.title,
        content: newTask.content,
        isNotified: isNotified,
        isRepeated: isRepeat,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
        priority: 'MEDIUM',
        taskStatus: taskStatus,
        listNo: selectedList?.no || '',
        isTimeSet: timeSetMap[tasks.no] || false,
        dateStatus: selectedButton
      };
      
      await addTask(task);

      setNewTask({  // 상태를 초기화합니다.
        title: '',
        content: '',
        startDate: today,
        endDate: null,
        isNotified: initialAlarm,
        isRepeated: 'NOREPEAT',
        dateStatus: 'DATE',
        listNo: selectedList?.no || '',
      });
      // refreshTasks();
    }
    handleClose();
  }

  useImperativeHandle(ref, () => ({
    showModal: handleShow,
  }));

  //입력필드 값이 변경될때 newTask상태 업데이트
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
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
    setShow(false);
  };
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
            isTimeSet={timeSetMap[tasks.no] || false}
            setIsTimeSet={(value) => handleTimeSetChange(tasks, value)}
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