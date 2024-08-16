import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import { LuPin, LuPinOff } from "react-icons/lu";
import { MdCancelPresentation } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";
import { AiOutlineRollback } from "react-icons/ai";
import { MdLocalPrintshop } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from "react-icons/bs";

const SetTaskToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{
      cursor: 'pointer',
      color: 'black'
    }}
  >
    {children}
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
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
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);

const SetTask = ({ task, deleteTask, handleCancel, isCancelled, setIsCancelled, onReopen, }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleDoReopen = () => {
    if (isCancelled) {
      setIsCancelled(false);
      setChecked(false);
    } else {
      setChecked(!checked);
    }
    if (onReopen) {
      onReopen(); // 부모 컴포넌트의 상태도 업데이트합니다.
    }
  };

  const togglePin = () => setIsPinned(!isPinned);
  return (
    <Dropdown>
      <Dropdown.Toggle as={SetTaskToggle} id="dropdown-custom-components">
        <BsThreeDots />
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        {isPinned ? (
          <Dropdown.Item eventKey="1" onClick={togglePin}>
            <LuPinOff /> Unpin
          </Dropdown.Item>
        ) : (
          <Dropdown.Item eventKey="1" onClick={togglePin}>
            <LuPin /> Pin
          </Dropdown.Item>
        )}
        {isCancelled ? (
          <Dropdown.Item eventKey="2" onClick={handleDoReopen}>
            <AiOutlineRollback /> Reopen
          </Dropdown.Item>
        ) : (
          <Dropdown.Item eventKey="2" onClick={() => handleCancel(task)}>
            <MdCancelPresentation /> Won't Do
          </Dropdown.Item>
        )}
        <Dropdown.Item eventKey="3"><FaRegStickyNote /> Open as sticky note</Dropdown.Item>
        <Dropdown.Item eventKey="4"><MdLocalPrintshop /> Print</Dropdown.Item>
        <Dropdown.Item eventKey="5"
          onClick={() => deleteTask(task.no)}><RiDeleteBin6Line /> Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}


export default SetTask;