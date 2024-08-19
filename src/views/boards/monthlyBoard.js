import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/monthlyBoard.css';
import TaskBoxForCal from '../../components/task_state/taskBoxForCal';
import CreateTask from '../../components/task_state/createTaskModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Col } from 'react-bootstrap';
import { useParams, useOutletContext } from 'react-router-dom';


const MonthlyBoard = () => {
  const {
    tasks, addTask, updateTask, deleteTask, lists, addList, updateList, deleteList, user, setUser,
    checked, setChecked, isCancelled, setIsCancelled, handleCancel, handleCheckboxChange, handleReopen
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

    // if (isNaN(date.getTime())) return undefined; // 날짜가 유효하지 않으면 undefined 반환

    return date;
  };

  const createMemo = (date) => {
    setStartDate(date);
    if (createTaskModalRef.current) {
      createTaskModalRef.current.showModal();
    }
  };

  const handleTaskCellClick = (event, date) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    setStartDate(date);
    createMemo(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const scrollToToday = () => {
    setSelectedDate(new Date());
  };

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

  // const showdate=date.getDate().toString();
  // const TaskStartDate = new Date(tasks.startDate);
  // const dateForStart = TaskStartDate.getDate();
  // const isTaskEndDate = dateForStart === parseInt(showdate);

  const getTaskListColor = (task) => {
    if (!task || !task.list || !lists) {
      return 'transparent';
    }
    const list = lists.find(list => list.no === task.list.no);
    // console.log( task.title,  task.list.no,  list.color)
    return list ? list.color : 'transparent';

  };

  const addListToTasks = (tasks, lists) => {
    return tasks.map(task => {
      const list = lists.find(list => list.no === task.listNo); // task.listNo는 task가 속한 리스트의 ID입니다.
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
            {weeks.map((week) => (
              <tr key={week}>
                {days.map((day) => {
                  const date = getDate(week, day);
                  if (!date) return null;

                  // const showdate = date.getDate().toString();
                  // const TaskStartDate = new Date(tasks.startDate);
                  // const dateForStart = TaskStartDate.getDate();
                  // const isTaskEndDate = dateForStart === parseInt(showdate);

                  const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  const currentMonth = monthNames[selectedDate.getMonth()];
                  const todayClass = isToday(date) ? 'today-cell' : 'date-cell';
                  const outsideMonthClass = isCurrentMonth ? '' : 'outside-month';
                  const dayTasksForPeriod = filterTasksForPeriod(date);
                  const dayTasks = addListToTasks(dayTasksForPeriod, lists);

                  return (
                    <td key={day} ref={isToday(date) ? todayRef : null} className={`calendar-cell ${outsideMonthClass}`}>
                      <div className="day-cell">
                        <div className={todayClass}>
                          {date.getDate() === 1 && <span>{currentMonth} </span>}
                          {date.getDate()}
                        </div>
                        <div className="task-cell" onClick={(e) => handleTaskCellClick(e, date)}>
                          {dayTasks.map(task => {
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
        ref={createTaskModalRef} date={startDate} addTask={addTask} lists={lists} />
    </div>
  );
};

export default MonthlyBoard;