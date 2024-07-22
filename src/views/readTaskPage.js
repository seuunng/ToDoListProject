import React, { useState } from 'react';
import '../styles/basicStyle.css';
import '../styles/readTaskPage.css';

const readTaskPage = ({ date, taskTitle, des }) => {
  return (
    <div className="readTaskPage">
      <div>
        <input type="checkbox" />
      </div>
      <i className="fa-regular fa-calendar"></i>
      {date}
      <i className="fa-regular fa-flag"></i>
      <h4 className="">{taskTitle}</h4>
      {des}
    </div>
  );
};

export default readTaskPage;