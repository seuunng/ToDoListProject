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

const SetTaskToggle = React.forwardRef(({ children, onClick }, ref) => (
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
          {/* <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          /> */}
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

  const SetTask = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={SetTaskToggle} id="dropdown-custom-components">
          <BsThreeDots />
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="1"><LuPin /> Pin</Dropdown.Item>
          <Dropdown.Item eventKey="1"><LuPinOff /> Unpin</Dropdown.Item>
          <Dropdown.Item eventKey="2"><MdCancelPresentation /> Won't Do</Dropdown.Item>
          <Dropdown.Item eventKey="2"><AiOutlineRollback /> Reopen</Dropdown.Item>
          <Dropdown.Item eventKey="3"><FaRegStickyNote /> Open as sticky note</Dropdown.Item>
          <Dropdown.Item eventKey="4"><MdLocalPrintshop /> Print</Dropdown.Item>
          <Dropdown.Item eventKey="5"><RiDeleteBin6Line /> Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }


export default SetTask;