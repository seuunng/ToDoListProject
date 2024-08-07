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
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
  const {
    tasks, addTask, updateTask, deleteTask, lists, addList, updateList, deleteList, user, setUser
  } = useOutletContext();


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
    return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 + dayOffset);
 
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
    createMemo(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isToday = (date) => {
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
    return tasks.filter(task => {
      const taskStartDate = new Date(task.startDate);
      return task.endDate == null
        ? (
          taskStartDate.getDate() === date.getDate() &&
          taskStartDate.getMonth() === date.getMonth() &&
          taskStartDate.getFullYear() === date.getFullYear()
        )
        : (
          date >= taskStartDate &&
          date <= new Date(task.endDate)
        );
    });
  };

  // const filterTasksForDate = (date) => {
  //   return tasks.filter(task => {
  //     const taskDate = new Date(task.startDate);
  //     // if (tasks.dateStatus === 'DATE') {
  //     return (
  //       taskDate.getDate() === date.getDate() &&
  //       taskDate.getMonth() === date.getMonth() &&
  //       taskDate.getFullYear() === date.getFullYear()
  //     );
  //     // }
  //   });
  // };
  // const getFilteredTasks = (date) => {
  //   if (selectedButton === 'date') {
  //     return filterTasksForDate(date);
  //   } else {
  //     return filterTasksForPeriod(date);
  //   }
  // };

  const isTaskEndDate = (task, date) => {
    if (!task.endDate) return false;
    const taskEndDate = new Date(task.endDate);
    return (
      date.getDate() === taskEndDate.getDate() &&
      date.getMonth() === taskEndDate.getMonth() &&
      date.getFullYear() === taskEndDate.getFullYear()
    );
  };

  const getTaskListColor = (task) => {
    if (!task || !task.list || !lists) {
      return 'transparent';
    }
    const list = lists.find(list => list.no === task.list.no);
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

  // const tasksWithLists = addListToTasks(tasks, lists);
  // console.log("tasksWithLists ", tasksWithLists )
  // const userEmail = user?.email || '';

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
                  const todayClass = isToday(date) ? 'today-cell' : 'date-cell'; //오늘날짜 음영
                  const dayTasksForPeriod = filterTasksForPeriod(date);
                  // const dayTasksForDate = filterTasksForDate(date);
                  const dayTasks = addListToTasks(dayTasksForPeriod, lists);
                  return (
                    <td key={day} ref={isToday(date) ? todayRef : null} className="calendar-cell">
                      <div className="day-cell">
                        <div className={todayClass}>{date.getDate()}</div>
                        <div className="task-cell" onClick={(e) => handleTaskCellClick(e, date)}>
                          {dayTasks.map(task => (
                            task.list ? (
                              <TaskBoxForCal
                                key={task.no}
                                showdate={date.getDate().toString()}
                                tasks={task}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                                className={isTaskEndDate(task, date) ? 'task-end-date' : ''}
                                lists={lists}
                                addList={addList}
                                updateList={updateList}
                                deleteList={deleteList}
                                style={{ backgroundColor: getTaskListColor(task) }}
                                refreshTasks={tasks}

                              // showTitle={!isTaskEndDate(task, date)}
                              />
                            ) : null
                          ))}
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