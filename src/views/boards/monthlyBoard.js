import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/monthlyBoard.css';
import TaskBoxForCal from '../../components/task_state/taskBoxForCal';
import CreateTask from '../../components/task_state/createTaskModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Col } from 'react-bootstrap';
import {  useOutletContext } from 'react-router-dom';
// 월별 달력 게시판
const MonthlyBoard = () => {
  const {
    tasks, addTask, updateTask, deleteTask, 
    lists, addList, updateList, deleteList, user, setUser,
    checked, setChecked, isCancelled, setIsCancelled, 
    handleCancel, handleCheckboxChange, handleReopen
  } = useOutletContext();
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
  const createTaskModalRef = useRef(null);
  const todayRef = useRef(null);
  const weeks = [1, 2, 3, 4, 5];
  const days = [1, 2, 3, 4, 5, 6, 7];
  // Setting모달 설정값
  const savedSeletedFirstDay = JSON.parse(localStorage.getItem('selectedOptions')) || { week: '일요일' };
  
  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedDate]);
  // 달력 기준 설정
  useEffect(() => {
    const firstDay = savedSeletedFirstDay.week === '월요일' ? 1 : 0; // 1 for Monday, 0 for Sunday
    setFirstDayOfWeek(firstDay);
    const daysOfWeek = firstDay === 1 ? ['월', '화', '수', '목', '금', '토', '일'] : ['일', '월', '화', '수', '목', '금', '토'];
    setDaysOfWeek(daysOfWeek);
  }, [savedSeletedFirstDay.week]);
  const getDate = (week, day) => {
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const firstDayOffset = (firstDayOfMonth.getDay() + 7 - firstDayOfWeek) % 7;
    const dayOffset = (week - 1) * 7 + (day - 1) - firstDayOffset;
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 + dayOffset);
    return date;
  };
  // 메모 생성
  const createMemo = (date) => {
    setStartDate(date);
    if (createTaskModalRef.current) {
      createTaskModalRef.current.showModal();
    }
  };
  // 메모 선택
  const handleTaskCellClick = (event, date) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    setStartDate(date);
    createMemo(date);
  };
  // 메모 날짜 변경
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // 오늘 날짜 계산
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  // 오늘로 돌아오기 기능
  const scrollToToday = () => {
    setSelectedDate(new Date());
  };
  // 취소 및 삭제 테스크 필터링
  const filterTasksForPeriod = (date) => {
    const filteredTasks = tasks.filter(task => {
      if (task.taskStatus === 'CANCELLED' || task.taskStatus === 'DELETED') return false;

      const taskStartDate = new Date(task.startDate);
      const taskEndDate = task.endDate ? new Date(task.endDate) : null;

      taskStartDate.setHours(0, 0, 0, 0);
      if (taskEndDate) {
        taskEndDate.setHours(0, 0, 0, 0);
      }

      return taskEndDate == null
        ? date.getTime() === taskStartDate.getTime()
        : date.getTime() >= taskStartDate.getTime() && date.getTime() <= taskEndDate.getTime();
    });
    return [...filteredTasks];
  };
  // 테스크박스에 리스트 컬러 입히기
  const getTaskListColor = (task) => {
    if (!task || !task.list || !lists) {
      return 'transparent';
    }
    const list = lists.find(list => list.no === task.list.no);
    return list ? list.color : 'transparent';
  };
  // 할일에 list속성으로 추가
  const addListToTasks = (tasks, lists) => {
    return tasks.map(task => {
      const list = lists.find(list => list.no === task.listNo); 
      return {
        ...task,
        list: list || null,
      };
    });
  };

  return (
    <div className="monthly-board-container">
      <h4 className="list-title">MonthlyBoard</h4>
      <div className="month-year-title row">
        <Col>
          {/* 데이트피커 */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM, yyyy"
            showMonthYearPicker
            popperPlacement="bottom-start"
            popperArrow="bottom-start"
          />
        </Col>
        <Col className='righted'>
          <Button onClick={scrollToToday} className='righted' variant="outline-dark">Today</Button>
        </Col>
      </div>
      <div className="calendar">
        <table className="calendar-table">
          {/* 요일 렌더링 */}
          <thead className="days_of_the_week">
            <tr>
              {daysOfWeek.map(day => (
                <td key={day} >
                  <div>{day}</div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 날짜 렌더링 */}
            {weeks.map((week) => (
              <tr key={week}>
                {days.map((day) => {
                  const date = getDate(week, day);
                  if (!date) return null;
                  const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const currentMonth = monthNames[selectedDate.getMonth()];
                  const todayClass = isToday(date) ? 'today-cell' : 'date-cell';
                  const outsideMonthClass = isCurrentMonth ? '' : 'outside-month';
                  const dayTasksForPeriod = filterTasksForPeriod(date);
                  const dayTasks = addListToTasks(dayTasksForPeriod, lists);
                  const sortedTasks = dayTasks.sort((a, b) => {
                    if (a.dateStatus < b.dateStatus) return 1;
                    if (a.dateStatus > b.dateStatus) return -1;
                    return 0;
                  });

                  return (
                    <td key={day} ref={isToday(date) ? todayRef : null} className={`calendar-cell ${outsideMonthClass}`}>
                      <div className="day-cell">
                        {/* 오늘 날짜 렌더링 */}
                        <div className={todayClass}>
                          {date.getDate() === 1 && <span>{currentMonth} </span>}
                          {date.getDate()}
                        </div>
                        {/* 할일 렌더링 */}
                        <div className="task-cell" onClick={(e) => handleTaskCellClick(e, date)}>
                          {sortedTasks.map(task => { 
                              const TaskStartDate = new Date(task.startDate); // 수정된 부분
                              const dateForStart = TaskStartDate.getDate();
                              const showdate = date.getDate().toString();
                              const isTaskEndDate = dateForStart === parseInt(showdate);
                              return task.list ? (
                                <TaskBoxForCal
                                  key={task.no}
                                  showdate={showdate}
                                  tasks={task}
                                  updateTask={updateTask}
                                  deleteTask={deleteTask}
                                  className={isTaskEndDate ? '' : 'task-end-date'}
                                  lists={lists}
                                  addList={addList}
                                  updateList={updateList}
                                  deleteList={deleteList}
                                  style={{ backgroundColor: getTaskListColor(task) }}
                                  refreshTasks={tasks}
                                  checked={checked}
                                  setChecked={setChecked}
                                  isCancelled={isCancelled}
                                  setIsCancelled={setIsCancelled}
                                  handleCancel={handleCancel}
                                  handleCheckboxChange={handleCheckboxChange}
                                  handleReopen={handleReopen}
                                />
                              ) : null
                            })}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateTask
        ref={createTaskModalRef} date={startDate} addTask={addTask} lists={lists} user={user}/>
    </div>
  );
};

export default MonthlyBoard;