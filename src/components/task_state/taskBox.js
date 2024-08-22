import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/taskStatus.css';
import CheckBox from '../../modules/checkBoxModule'
import { Row, Col } from 'react-bootstrap';
import DatePickerModule from '../../modules/datePickerModule';
import SetTask from './setTask';
import { TaskBoxProvider, useTaskBox } from '../../contexts/taskBoxContext';
// 테스크 박스(체크박스+제목+날짜+할일 설정 버튼)
const TaskBoxContent = ({
  task = {}, deleteTask, updateTask, refreshTasks,
  handleCheckboxChange, handleCancel, handleReopen
}) => {
  // 유효한 날짜인지 확인하는 기능
  const getValidDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? new Date() : date;
  };
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [startDate, setStartDate] = useState(getValidDate(task.startDate));
  const [endDate, setEndDate] = useState(task.endDate ? getValidDate(task.endDate) : null);
  const [timeSetMap, setTimeSetMap] = useState({});
  const [selectedButton, setSelectedButton] = useState(task.dateStatus || 'DATE');
  const [checked, setChecked] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  //taskBox인지 확인하기: datePicker형식 차별화 목적
  const { setIsTaskBox } = useTaskBox();
  //할일의 내용이 변경될 떄마다 초기화
  useEffect(() => {
    if (task && task.title) {
      setTaskTitle(task.title);
      setStartDate(getValidDate(task.startDate));
      setEndDate(task.endDate ? getValidDate(task.endDate) : null);
      setSelectedButton(task.dateStatus || 'DATE');
      setChecked(task.taskStatus === 'COMPLETED');
      setIsCancelled(task.taskStatus === 'CANCELLED');

      setTimeSetMap((prevMap) => ({
        ...prevMap,
        [task.no]: task.isTimeSet || false,
      }));
    }
  }, [task, setChecked, setIsCancelled]);
  // 데이트피커 날짜형식 저장을 위한 해당 테스크가 
  useEffect(() => {
    setIsTaskBox(true);
    return () => setIsTaskBox(false);
  }, [setIsTaskBox]);
  // 제목 변경 기능
  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTaskTitle(newTitle);
    await updateTask({ ...task, title: newTitle });
    await refreshTasks();
  };
  // 날짜 변경 기능
  const handleDateChange = async (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    // 날짜에 따른 체크박스 상태를 자동으로 계산
    let updatedStatus = task.taskStatus;
    const now = new Date();
    now.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 초기화하여 날짜 비교만 수행하도록 설정
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = endDate ? new Date(endDate) : null;
    if (end) {
      end.setHours(0, 0, 0, 0);
    }
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
  };
  // 날짜 형식 선택 버튼클릭시 시행
  const handleSelectedButtonChange = async (button) => {
    setSelectedButton(button);
    await updateTask({ ...task, dateStatus: button.toUpperCase() });
  };
  // 체크박스 상태에 따른 클래스네임 정의
  const taskStatusClassName = task.taskStatus === 'OVERDUE'
    ? 'task-overdue'
    : task.taskStatus === 'COMPLETED'
      ? 'task-completed'
      : task.taskStatus === 'CANCELLED'
        ? 'task-cancelled'
        : '';
  // 시간 선택 기능
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
    <div className={`${taskStatusClassName}`} style={{ position: 'relative'}}>
      <Row xs="auto">
        <Col sm={8}
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <CheckBox
            task={task}
            checked={checked}
            isCancelled={isCancelled}
            setChecked={setChecked}
            setIsCancelled={setIsCancelled}
            onChange={() => handleCheckboxChange(task.no)}
          /> &nbsp;
          <span className="task-title">
            <input
              type="text"
              value={taskTitle}
              onChange={handleTitleChange}
              className={`form-control task-box ${taskStatusClassName}`}
              placeholder="Task Title"
              style={{ border: "none", width: 260 }}
            />
          </span>
        </Col>
        <Col md={3} className='righted' style={{ padding: "0" ,position: "relative"}}>

          {/* 메모 반복 및 알림 여부 아이콘 표시 기능: 추후구현 예정 */}
          {/* {task.isRepeated !== 'NOREPEAT' && (
            <span
              className={`repeat col-2 task-box ${taskStatusClassName}`}
              style={{ width: 16 }}>
              <LuRepeat style={{ color: "grey" }} className={`task-box ${taskStatusClassName}`} />
            </span>
          )}
          &nbsp;
          {(task.isNotified !== 'NOALARM') && (
            <span
              className={`alram col-2 task-box ${taskStatusClassName}`}
              style={{ width: 16 }}>
              <FaRegBell style={{ color: "grey" }} className={`task-box ${taskStatusClassName}`} />
            </span>
          )} */}

          <DatePickerModule
            show={setShowDatePicker}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            selectedButton={selectedButton}
            setSelectedButton={handleSelectedButtonChange}
            dateFormat={'MM/dd'}
            isTaskBox={true}
            isTimeSet={timeSetMap[task.no] || false}
            setIsTimeSet={(value) => handleTimeSetChange(task, value)}
          />
        </Col>
        <Col md={1} style={{ padding: "0" }} className='centered'>
          {/* 할일 설정 드롭다운 버튼 */}
          <SetTask
            task={task}
            deleteTask={deleteTask}
            isCancelled={isCancelled}
            setIsCancelled={setIsCancelled}
            handleCancel={() => handleCancel(task)}
            className={`task-box ${taskStatusClassName}`}
            onReopen={() => handleReopen(task)}
          />
        </Col>
      </Row>
    </div>
  );
};

const TaskBox = (props) => (
  // 모든 Task에 isTaskBox여부를 전달하는 목적
  <TaskBoxProvider>
    <TaskBoxContent {...props} />
  </TaskBoxProvider>
);

export default TaskBox;