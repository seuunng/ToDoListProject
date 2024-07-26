import React from 'react';
import '../../styles/basicStyle.css';

const taskBox = ({ task, date }) => {
  return (
    <div>
       {task} - {date}
    </div>
  );
};

export default taskBox;