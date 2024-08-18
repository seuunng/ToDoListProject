import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/readTaskModal.css';
import { Modal, Button } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
import DatePickerModule from '../../modules/datePickerModule';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaCalendarCheck } from "react-icons/fa";
import Checkbox from '../../modules/checkBoxModule';
import { PiLineVerticalThin } from "react-icons/pi";
import SetTask from './setTask';
import SelectedList from '../task_list/selectedList.js';

const ReadTaskModal = forwardRef(({
  tasks,
  updateTask, deleteTask,
  lists, addList, updateList, deleteList, refreshTasks,
  checked, setChecked, isCancelled, setIsCancelled,
  handleCancel, handleCheckboxChange, handleReopen
}, ref) => {
  const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
  const savedselectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const alarmMapping = {
    "정각": "ONTIME",
    "5분전": "FIVEMINS",
    "30분전": "THIRTYMINS",
    "하루전": "DAYEARLY"
  };
  const initialAlarm = savedAllSwitchesAlarm ? alarmMapping[savedselectedOptions.alarmTime] : "NOALARM";
  
  // console.log("1",initialAlarm); //THIRTYMINS
  
  const [show, setShow] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskDescription, setTaskDescription] = useState(tasks.content);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [timeSetMap, setTimeSetMap] = useState({});
  const [selectedButton, setSelectedButton] = useState(tasks.dateStatus || 'DATE');
  const [isRepeat, setIsRepeat] = useState(tasks.isRepeated || 'NOREPEAT');
  const [isNotified, setIsNotified] = useState(tasks.isNotified || initialAlarm);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    setTaskTitle(tasks.title);
    setTaskDescription(tasks.content);
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setIsRepeat(tasks.isRepeated || 'NOREPEAT');
    setIsNotified(tasks.isNotified || initialAlarm);
    setSelectedList(lists.find(list => list.no === tasks.list.no) || null);
 
    setTimeSetMap((prevMap) => ({
      ...prevMap,
      [tasks.no]: tasks.isTimeSet || false,
    }));

  }, [tasks, lists]);

  useEffect(() => {
    setChecked(checked)
    setIsCancelled(isCancelled);
  }, [tasks, checked, isCancelled]);

  const handleClose = () => {
    const updatedTask = {
      ...tasks,
      title: taskTitle,
      content: taskDescription,
      startDate,
      endDate,
      dateStatus: selectedButton
    };
    updateTask(updatedTask);
    setShow(false);
  }

  const handleShow = () => setShow(true);
  useImperativeHandle(ref, () => ({
    openModal: handleShow,
  }));

  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);

    let updatedStatus = tasks.taskStatus;

    const now = new Date();
    now.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화하여 날짜 비교만 수행하도록 설정
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = endDate ? new Date(endDate) : null;
    if (end) {
      end.setHours(0, 0, 0, 0);
    }
  
    // 상태를 자동으로 계산
    if (tasks.taskStatus !== 'COMPLETED' && tasks.taskStatus !== 'CANCELLED' && tasks.taskStatus !== 'DELETED') {
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
    const updatedTask = { ...tasks, startDate, endDate, taskStatus: updatedStatus };
    await updateTask(updatedTask);
    // await refreshTasks(); 
  };

  const handleSelectedButtonChange = (button) => {
    setSelectedButton(button);
    
    console.log("selectedList", selectedList)

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

    const updatedTasks = { ...tasks, isRepeated: isRepeated };
    updateTask(updatedTasks);
  };

  const handleAlarmClick = (option) => {
    const alarmMapping = {
      "알림없음": "NOALARM",
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

  const handleTimeSetChange = (tasks, value) => {
    setTimeSetMap((prevMap) => ({
      ...prevMap,
      [tasks.no]: value,
    }));
    updateTask({
      ...tasks,
      isTimeSet: value,
  });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <div className="d-flex align-items-center">
          <Checkbox
            task={tasks}
            checked={checked}
            setChecked={setChecked}
            onChange={() => handleCheckboxChange(tasks.no)}
            setIsCancelled={setIsCancelled}
            isCancelled={isCancelled}
          />
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
            initialRepeat={isRepeat}
            initialAlarm={initialAlarm}
            isNotified={isNotified}
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
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="form-control"
              placeholder="Task Title"
              style={{ border: "none" }}
              onKeyDown={handleKeyDown}
            />
          </span>
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
              setSelectedButton={handleSelectedButtonChange}
              onChange={() => handleCheckboxChange(tasks.no)}
            />
          </div>
          <div className="setting-icon col righted">
            <SetTask
              task={tasks}
              deleteTask={deleteTask}
              onReopen={() => handleReopen(tasks)}
              isCancelled={isCancelled}
              setIsCancelled={setIsCancelled}
              handleCancel={() => handleCancel(tasks)}
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
});

export default ReadTaskModal;