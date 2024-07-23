import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/monthlyBoard.css';
import TaskBoxForCal from '../../components/task_state/taskBoxForCal';
import CreateTask from '../../components/task_state/createTaskModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Col } from 'react-bootstrap';
// import { registerLocale, setDefaultLocale } from "react-datepicker";
// import ko from 'date-fns/locale/ko'; // 한국어 로케일 사용 (원하는 로케일을 사용할 수 있습니다)

// registerLocale('ko', ko);
// setDefaultLocale('ko');

const MonthlyBoard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const createTaskModalRef = useRef(null);
  const todayRef = useRef(null); // 오늘 날짜 셀을 참조할 ref

  const getDate = (week, day) => {
    // Week and day are 1-based
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1); 
    const dayOffset = (week - 1) * 7 + (day - firstDayOfMonth.getDay());
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 + dayOffset);
    return date;
  };

  const createMemo = (date, e) => {
    setStartDate(date);
    if (createTaskModalRef.current) {
      createTaskModalRef.current.showModal();
    }
  };

  const weeks = [1, 2, 3, 4, 5];
  const days = [1, 2, 3, 4, 5, 6, 7];

  const handleTaskCellClick = (event, date) => {
    const taskBoxForCalElement = event.target.closest('.TaskBoxForCal');
    if (event.target !== event.currentTarget) {
      return; 
    }
    createMemo(date, event);
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

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedDate]);

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
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
              <td>일</td>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week) => (
              <tr key={week}>
                {days.map((day) => {
                  const date = getDate(week, day);
                  const todayClass = isToday(date) ? 'today-cell' : 'date-cell';
                  return (
                    <td key={day} ref={isToday(date) ? todayRef : null}>
                      <div className="day-cell">
                        <div className={todayClass}>{date.getDate()}</div>
                        <div className="task-cell" onClick={(e) => handleTaskCellClick(e, date)}>
                          <TaskBoxForCal
                            showdate={date.getDate().toString()}
                            task={`Task ${day}`}
                            description={`Description for task ${day}`}
                            listtitle={`List title for task ${day}`}
                          />
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
      <CreateTask ref={createTaskModalRef} date={startDate}  />
    </div>
  );
};

export default MonthlyBoard;