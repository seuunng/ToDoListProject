import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoReorderThree } from "react-icons/io5";

const SetListToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{
      cursor: 'pointer',
      color: 'black',
      textDecoration: 'none'
    }}
  >
    {children}
  </a>
));

const Lists = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
        {React.Children.toArray(children)}
        </ul>
      </div>
    );
  },
);

const SelectedList = ({ lists, selectedList, 
  setSelectedList, tasks, updateTask,
  }) => {
  if (!lists || !Array.isArray(lists)) {
    return null; // 또는 적절한 오류 처리
  }
  const filteredLists = lists.filter(list => !list.isDeleted);
  const handleSelect = (list) => {
    setSelectedList(list);
    // updateTask({ ...tasks, list: { no: list.no } });
  };
  return (
    <Dropdown>
      <Dropdown.Toggle as={SetListToggle} id="dropdown-custom-components"
      >
        {selectedList?.title ? (
          <>
            {selectedList.icon} {selectedList.title}
          </>
        ) : (
          <IoReorderThree />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu as={Lists}>
        {filteredLists.map((list, index) => (
          <Dropdown.Item key={index} onClick={() => handleSelect(list)}>
            {list.icon ? list.icon : <IoReorderThree />} {list.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}


export default SelectedList;