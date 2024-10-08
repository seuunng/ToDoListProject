import React, { useState, useImperativeHandle, useEffect, forwardRef } from 'react';
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
//할일 생성 모달
const CreateTaskModal = forwardRef((props, ref) => {
  const { addTask, date, tasks = {}, deleteTask, lists = []} = props;

  //입력된 날짜가 유효한지 확인
  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  // 로컬 스토리지에서 값을 가져오는 함수
   const getStoredItem = (key) => {
    try {
      const storedItem = localStorage.getItem(key);
      if (!storedItem || storedItem === "undefined" || storedItem === "null") {
        return null;
      }
      return JSON.parse(storedItem);
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage`, error);
      return null;
    }
  };
  // 로컬 스토리지에서 선택된 리스트와 기본 리스트 가져오기
  const selectedList_localStorage = getStoredItem('selectedList');
  const foundList = lists.find(list => list.title === "기본함");
  const defaultList = getStoredItem('defaultList') || foundList;
  //초기상태설정
  const [show, setShow] = useState(false);
  const [selectedList, setSelectedList] = useState(selectedList_localStorage || defaultList);
  const [newTask, setNewTask] = useState({
    title: '',
    content: '',
    startDate: date,
    endDate: null,
    dateStatus: 'DATE',
    listNo: selectedList?.no || '',
  });
  //DatePicker관련 상태설정
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedButton, setSelectedButton] = useState(tasks?.dateStatus || 'DATE');
  const [startDate, setStartDate] = useState(isValidDate(new Date(tasks.startDate)) ? new Date(tasks.startDate) : new Date());
  const [endDate, setEndDate] = useState(isValidDate(new Date(tasks.endDate)) ? new Date(tasks.endDate) : null);
  const [timeSetMap, setTimeSetMap] = useState({});
  //모달이 열릴 때 실행
  useEffect(() => {
    if (show) {
      handleShow();
      setStartDate(isValidDate(date) ? date : new Date()); 
    }
  }, [show]);
  //모달 열릴때 모달 데이터
  const handleShow = () => {
    setSelectedList(selectedList_localStorage || defaultList);
    const listNo = selectedList_localStorage?.no || defaultList?.no || null;
    setNewTask({
      title: '',
      content: '',
      startDate: isValidDate(date) ? date : new Date(),
      endDate: null,
      dateStatus: tasks.dateStatus || 'DATE',
      listNo: listNo,
      isTimeSet: tasks.isTimeSet || false,
    });
    if (listNo === null) {
      console.warn("No valid list found. Please select a valid list.");
  }
    setTimeSetMap(prevMap => ({
      ...prevMap,
      [tasks.no]: tasks.isTimeSet || false,
    }));
    setShow(true);
  };
  //날짜 변경 기능
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setNewTask(prevState => ({
      ...prevState,
      startDate: start,
      endDate: end
    }));
  };
  //날짜입력 방식 선택 기능
  const handleSelectedButtonChange = (button) => {
    setSelectedButton(button);
    setNewTask({ ...tasks, dateStatus: button.toUpperCase() });
  }
  //시간 입력 기능
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
  //메모 저장 기능
  const createTask = async () => {
    if (newTask.title && newTask.title.trim()) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let taskStatus;
      if (startDate.toISOString() < today.toISOString()) {
        taskStatus = 'OVERDUE'; 
      } else {
        taskStatus = 'PENDING';
      }
      if (tasks.no && timeSetMap[tasks.no] !== (tasks.isTimeSet || false)) {
        setTimeSetMap((prevMap) => ({
          ...prevMap,
          [tasks.no]: tasks.isTimeSet || false,
        }));
      }
      const task = {
        title: newTask.title,
        content: newTask.content,
        startDate: startDate.toISOString(),
        endDate: endDate ? endDate.toISOString() : null,
        priority: 'MEDIUM',
        taskStatus: taskStatus,
        listNo: selectedList?.no || '',
        isTimeSet: timeSetMap[tasks.no] || false,
        dateStatus: selectedButton
      };
      await addTask(task);
      setNewTask({  
        title: '',
        content: '',
        startDate: today,
        endDate: null,
        dateStatus: 'DATE',
        listNo: selectedList?.no || '',
      });
    }
    handleClose();
  }
  // 모달 보이기 기능을 위한 useImperativeHandle
  useImperativeHandle(ref, () => ({
    showModal: handleShow,
  }));
  // 입력필드 값이 변경될때 newTask상태 업데이트
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
            selectedButton={selectedButton}
            setSelectedButton={handleSelectedButtonChange}
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
        </div>
        <div className="description">
          <textarea
            className="description-input"
            name="content"
            placeholder="내용을 입력하세요"
            value={newTask.content}
            onChange={handleInputChange}
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