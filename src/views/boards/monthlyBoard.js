import React, { useState, useRef } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/monthlyBoard.css';
import TaskBoxForCal from '../../components/task_state/taskBoxForCal';
import CreateTask from '../../components/task_state/createTaskModal';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from 'date-fns/locale/ko'; // 한국어 로케일 사용 (원하는 로케일을 사용할 수 있습니다)


const MonthlyBoard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const createTaskModalRef = useRef(null);

  const getDate = (week, day) => {
    // Week and day are 1-based
    const firstDayOfMonth = new Date(2024, 5, 1); // June 1, 2024
    const dayOffset = (week - 1) * 7 + (day - firstDayOfMonth.getDay());
    const date = new Date(2024, 5, 1 + dayOffset);
    return date.getDate();
  };

  const createMemo = (date, e) => {
    // if (e) {
    //   console.log("createMemo called", e);
    //   e.stopPropagation();
    // }
    setSelectedDate(date);
    if (createTaskModalRef.current) {
      createTaskModalRef.current.showModal();
    }
  };

  const weeks = [1, 2, 3, 4, 5];
  const days = [1, 2, 3, 4, 5, 6, 7];

  // task-cell을 클릭했을 때만 createMemo를 호출
  const handleTaskCellClick = (event, date) => {
    // TaskBoxForCal의 클릭 이벤트가 아니라면 createMemo를 호출
    const taskBoxForCalElement = event.target.closest('.TaskBoxForCal');
    // console.log('TaskBoxForCal element1:', event.target);
    // console.log('TaskBoxForCal element2:', event.currentTarget);
    if (event.target !== event.currentTarget) {
      return; // 이벤트가 TaskBoxForCal 내에서 발생한 경우 처리하지 않음
    }
    createMemo(date, event);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  return (
    <div className="monthly-board-container">
      <h4 className="list-title">MonthlyBoard</h4>
      <div className="month-year-title">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        dateFormat="MMMM, yyyy"
        showMonthYearPicker
        locale="ko"
        style={{fontSize: "40px"}}
      />
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
                {days.map((day) => (
                  <td key={day}>
                    <div className="day-cell" > 
                      <div className="date-cell">{getDate(week, day)}</div>
                      <div className="task-cell" onClick={(e) => handleTaskCellClick(e, getDate(week, day))}>
                        <TaskBoxForCal
                          showdate={getDate(week, day).toString()}
                          task={`Task ${day}`}
                          description={`Description for task ${day}`}
                          listtitle={`List title for task ${day}`}
                        />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateTask ref={createTaskModalRef} date={selectedDate}  />
    </div>
  );
};

export default MonthlyBoard;