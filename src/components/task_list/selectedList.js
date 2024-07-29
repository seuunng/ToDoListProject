import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import { LuPin } from "react-icons/lu";
import { LuPinOff } from "react-icons/lu";
import { MdCancelPresentation } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { BsThreeDots } from "react-icons/bs";
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
      // display: 'inline-flex',
      // alignItems: 'center',
      // justifyContent: 'center',
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

const SelectedList = ({ lists, selectedList, setSelectedList, tasks, updateTask  }) => {
  const handleSelect = (list) => {
    setSelectedList(list);
    updateTask({ ...tasks, list: { no: list.no } });
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
        {lists.map((list, index) => (
          <Dropdown.Item key={index} onClick={() => handleSelect(list)}>
            {list.icon ? list.icon : <IoReorderThree />} {list.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}


export default SelectedList;