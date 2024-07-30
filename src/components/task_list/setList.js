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
import { MdEditNote } from "react-icons/md";
import { upload } from '@testing-library/user-event/dist/upload';
import EditListModal from '../task_list/createListModal';
import AlertModalModule from '../../modules/alertModalModule';

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
      color: 'grey'
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
const SetList = ({ list, deleteList, updateList }) => {
  const [isPinned, setIsPinned] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const togglePin = () => setIsPinned(!isPinned);

  const editListModalOpen = () => {
    setShowCreateListModal(true);
  };

  const removeList = () => {
    setShowDeleteModal(true);
  };

  const handleALertClick = () => {
    deleteList(list);
    setShowDeleteModal(false);
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={SetListToggle} id="dropdown-custom-components">
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
          <Dropdown.Item eventKey="2" onClick={editListModalOpen}><MdEditNote /> Edit</Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={removeList}>
            <RiDeleteBin6Line /> Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <EditListModal
        show={showCreateListModal}
        onHide={() => setShowCreateListModal(false)}
        lists={list}
        updateList={updateList}
        isEditMode={true} />
      <AlertModalModule
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        lists={list}
        handleALertClick={handleALertClick}
        title={`${list.title} 삭제`}
        alert={'연결된 할 일이 있을 수 도 있습니다. 정말 삭제할까요?'}
        hideBtn={'취소'}
        saveBtn={'삭제'}
      />
    </>
  );
}


export default SetList;