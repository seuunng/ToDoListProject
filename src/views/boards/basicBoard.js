import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import SimpleInputTask from '../../components/task_state/simpleInputTask'
import TaskCont from '../../components/task_list/taskCont';

const BasicBoard = ({ tasks, addTask, updateTask }) => {


  return (
      <div className="BasicBoard">
        <h4 className="list-title">List Title</h4>
        <div className="task-table">
          <SimpleInputTask addTask={addTask} />
        </div>
        <div>
          <TaskCont tasks={tasks} updateTask ={updateTask }/>
        </div>
      </div>
      
  );
};

export default BasicBoard;