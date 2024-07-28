import React, { useState, useRef, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/monthlyBoard.css';
import TaskBoxForCal from '../../components/task_state/taskBoxForCal';
import CreateTask from '../../components/task_state/createTaskModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Col } from 'react-bootstrap';

const MonthlyBoard = ({ tasks, addTask, updateTask, deleteTask }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const createTaskModalRef = useRef(null);
  const todayRef = useRef(null);
  const weeks = [1, 2, 3, 4, 5];
  const days = [1, 2, 3, 4, 5, 6, 7];

  const getDate = (week, day) => {
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const dayOffset = (week - 1) * 7 + (day - firstDayOfMonth.getDay());
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1 + dayOffset);
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
  const filterTasksForDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.startDate);
      // if (tasks.dateStatus === 'DATE') {
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    // }
    });
  };
  // const getFilteredTasks = (date) => {
  //   if (selectedButton === 'date') {
  //     return filterTasksForDate(date);
  //   } else {
  //     return filterTasksForPeriod(date);
  //   }
  // };

  const isTaskEndDate = (task, date) => {
    const taskEndDate = new Date(task.endDate);
    return (
      date.getDate() === taskEndDate.getDate() &&
      date.getMonth() === taskEndDate.getMonth() &&
      date.getFullYear() === taskEndDate.getFullYear()
    );
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
              <td style={{ backGroundColor: "grey" }}>월</td>
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
                  const dayTasksForPeriod = filterTasksForPeriod(date);
                  // const dayTasksForDate = filterTasksForDate(date);
                  const dayTasks = [
                    ...dayTasksForPeriod, 
                    // ...dayTasksForDate
                    ];
                  return (
                    <td key={day} ref={isToday(date) ? todayRef : null} className="calendar-cell">
                      <div className="day-cell">
                        <div className={todayClass}>{date.getDate()}</div>
                        <div className="task-cell" onClick={(e) => handleTaskCellClick(e, date)}>
                          {dayTasks.map(task => (
                            <TaskBoxForCal
                              key={task.no}
                              showdate={date.getDate().toString()}
                              tasks={task}
                              updateTask={updateTask}
                              deleteTask={deleteTask}
                              className={isTaskEndDate(task, date) ? 'task-end-date' : ''}
                            // showTitle={!isTaskEndDate(task, date)}
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
        {/* <div className="filtered-tasks">
        <h5>Tasks for {selectedDate.toDateString()}</h5>
        {filteredTasks.map(task => (
          <TaskBoxForCal
            key={task.no}
            tasks={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            className="filtered-task"
            showTitle={true}
          />
        ))}
      </div> */}
      </div>
      <CreateTask
        ref={createTaskModalRef} date={startDate} addTask={addTask} />
    </div>
  );
};

export default MonthlyBoard;