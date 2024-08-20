import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from "react-icons/bs";
import { MdEditNote } from "react-icons/md";
import EditListModal from '../task_list/createListModal';
import AlertModalModule from '../../modules/alertModalModule';
//리스트 설정 드롭박스 보이기 기능
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
//리스트 설정 드롭박스 메뉴 커스텀
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
//리스트 설정 드롭박스 
const SetList = ({ list, deleteList, updateList }) => {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //리스트 수정 모달 열기 기능
  const editListModalOpen = () => {
    setShowCreateListModal(true);
  };
  //리스트 삭제 기능
  const removeList = () => {
    setShowDeleteModal(true);
  };
  //리스트 삭제 클릭시 확인 경고 기능
  const handleALertClick = () => {
    deleteList(list);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Dropdown>
        {/* 리스트 설정 토클 버튼 */}
        <Dropdown.Toggle as={SetListToggle} id="dropdown-custom-components">
          <BsThreeDots />
        </Dropdown.Toggle>
        {/* 리스트 설정 메뉴 */}
        <Dropdown.Menu as={CustomMenu}>

          {/* 특정리스트 상단고정 기능: 추후 구현 예정 */}
          {/* {isPinned ? (
            <Dropdown.Item eventKey="1" onClick={togglePin}>
              <LuPinOff /> Unpin
            </Dropdown.Item>
          ) : (
            <Dropdown.Item eventKey="1" onClick={togglePin}>
              <LuPin /> Pin
            </Dropdown.Item>
          )} */}

          <Dropdown.Item eventKey="2" onClick={editListModalOpen}>
            <MdEditNote /> Edit
          </Dropdown.Item>
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