import React, { useState, useRef } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/monthlyBoard.css';
import TaskBoxForCal from '../../components/task_state/taskBoxForCal';
import CreateTask from '../../components/task_state/createTaskModal';


const MonthlyBoard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  // const [showReadTask, setShowReadTask] = useState(false);
  const createTaskModalRef = useRef(null);

  const getDate = (week, day) => {
    // Week and day are 1-based
    const firstDayOfMonth = new Date(2024, 5, 1); // June 1, 2024
    const dayOffset = (week - 1) * 7 + (day - firstDayOfMonth.getDay());
    const date = new Date(2024, 5, 1 + dayOffset);
    return date.getDate();
  };

  const createMemo = (date) => {
    setSelectedDate(date);
    if (createTaskModalRef.current) {
      createTaskModalRef.current.showModal();
    }
  };

  const weeks = [1, 2, 3, 4, 5];
  const days = [1, 2, 3, 4, 5, 6, 7];

  // const handleOpenModal = () => {
  //   if (readTaskModalRef.current) {
  //     readTaskModalRef.current.openModal();
  //   }
  // };
  return (
    <div className="monthly-board-container">
      <h4 className="list-title">MonthlyBoard</h4>
      <h3 className="month">JUNE, 2024</h3>
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
                  <td key={day} onClick={() => createMemo(getDate(week, day))}>
                    <div className="day-cell">
                      <div className="date-cell">{getDate(week, day)}</div>
                      <div className="task-cell" onClick={() => setShowCreateTask(true)}>
                        <TaskBoxForCal
                          showdate={getDate(week, day).toString()}
                          task={`Task ${day}`}
                          description={`Description for task ${day}`}
                          listtitle={`List title for task ${day}`}
                          style={{ backgroundColor: "lightblue" }}
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