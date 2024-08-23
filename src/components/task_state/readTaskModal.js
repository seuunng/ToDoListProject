import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import { Modal } from 'react-bootstrap';
import DatePickerModule from '../../modules/datePickerModule';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaCalendarCheck } from "react-icons/fa";
import Checkbox from '../../modules/checkBoxModule';
import { PiLineVerticalThin } from "react-icons/pi";
import SetTask from './setTask';
import SelectedList from '../task_list/selectedList.js';
// 메모 조회 모달
const ReadTaskModal = forwardRef(({
  tasks, updateTask, deleteTask,
  lists,
  checked, setChecked, isCancelled, setIsCancelled,
  handleCancel, handleCheckboxChange, handleReopen
}, ref) => {
  // 초기 상태 설정
  const [show, setShow] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(tasks.title);
  const [taskDescription, setTaskDescription] = useState(tasks.content);
  const [startDate, setStartDate] = useState(new Date(tasks.startDate));
  const [endDate, setEndDate] = useState(tasks.endDate ? new Date(tasks.endDate) : null);
  const [timeSetMap, setTimeSetMap] = useState({});
  const [selectedButton, setSelectedButton] = useState(tasks.dateStatus || 'DATE');
  const [selectedList, setSelectedList] = useState(null);
  // 
  useEffect(() => {
    setTaskTitle(tasks.title);
    setTaskDescription(tasks.content);
    setStartDate(new Date(tasks.startDate));
    setEndDate(tasks.endDate ? new Date(tasks.endDate) : null);
    setSelectedButton(tasks.dateStatus || 'DATE');
    setSelectedList(lists.find(list => list.no === tasks.list.no) || null);
    setTimeSetMap((prevMap) => ({
      ...prevMap,
      [tasks.no]: tasks.isTimeSet || false,
    }));
  }, [tasks, lists]);

  useEffect(() => {
    setChecked(checked)
  }, [tasks, checked]);
  //모달 보이기 기능
  const handleShow = () => setShow(true);
  useImperativeHandle(ref, () => ({
    openModal: handleShow,
  }));
  //모달 숨기기 기능
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
  //날짜 수정 기능
  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);

    let updatedStatus = tasks.taskStatus;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = endDate ? new Date(endDate) : null;
    if (end) {
      end.setHours(0, 0, 0, 0);
    }
    // 날짜에 따른 메모 상태 설정
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
  };
  //날짜 선택 방식 변경 기능
  const handleSelectedButtonChange = (button) => {
    setSelectedButton(button);
    updateTask({ ...tasks, dateStatus: button.toUpperCase() });
  }
  //엔터 키 입력으로 메모 수정하기
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClose();
    }
  };
  //시간 변경 기능
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
            selectedButton={selectedButton}
            setSelectedButton={handleSelectedButtonChange}
            isTimeSet={timeSetMap[tasks.no] || false}
            setIsTimeSet={(value) => handleTimeSetChange(tasks, value)}
          />
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex align-items-center line">
          {/* 제목 */}
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
        {/* 내용 */}
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
            {/* 리스트 선택  */}
            <SelectedList
              lists={lists}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
              tasks={tasks}
              updateTask={updateTask}
              onChange={() => handleCheckboxChange(tasks.no)}
            />
          </div>
          <div className="setting-icon col righted">
            {/* 할일 설정 드롭다운 */}
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