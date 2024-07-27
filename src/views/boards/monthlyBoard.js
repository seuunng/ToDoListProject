import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/monthlyBoard.css';
import TaskBoxForCal from '../../components/task_state/taskBoxForCal';
import CreateTask from '../../components/task_state/createTaskModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Col } from 'react-bootstrap';

const MonthlyBoard = ({tasks, addTask, updateTask, deleteTask}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const createTaskModalRef = useRef(null);
  const todayRef = useRef(null); // 오늘 날짜 셀을 참조할 ref
  const weeks = [1, 2, 3, 4, 5];
  const days = [1, 2, 3, 4, 5, 6, 7];
  
  const getDate = (week, day) => {
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

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedDate]);

  const filterTasksForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.startDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
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
          <thead className="days_of_the_week"
            >
            <tr>
              <td style={{backGroundColor: "grey"}}>월</td>
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
                  const filteredTasks = filterTasksForDate(date);
                  return (
                    <td key={day} ref={isToday(date) ? todayRef : null}>
                      <div className="day-cell">
                        <div className={todayClass}>{date.getDate()}</div>
                        <div className="task-cell" onClick={(e) => handleTaskCellClick(e, date)}>
                        {filteredTasks.map(task => (
                          <TaskBoxForCal
                            showdate={date.getDate().toString()}
                            key={task.no}
                            tasks={task}
                            updateTask={updateTask}
                            deleteTask={deleteTask}
                          />
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
        ref={createTaskModalRef} date={startDate} addTask={addTask} />
    </div>
  );
};

export default MonthlyBoard;