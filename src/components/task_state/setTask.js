import React, { useState, useEffect, useRef } from 'react';
import '../../styles/basicStyle.css';
import { MdCancelPresentation } from "react-icons/md";
import { AiOutlineRollback } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from "react-icons/bs";
// 할일 설정 드롭박스 보이기 버튼
const SetTaskToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => onClick(e), 10);
    }}
    style={{
      cursor: 'pointer',
      color: 'black',
      zIndex: 1,  // 아이콘의 z-index를 낮게 설정
      position: 'relative',
    }}>
    {children}
  </a>
));
// 할일 설정 드롭박스 메뉴 
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

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
// 할일 설정 드롭박스
const SetTask = ({ task, deleteTask, handleCancel, isCancelled, setIsCancelled, onReopen, }) => {
  const [checked, setChecked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.forceUpdate(); // Dropdown의 위치를 강제 재계산
    }
  }, []);

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

  return (
    <Dropdown>
      <Dropdown.Toggle as={SetTaskToggle} id="dropdown-custom-components">
        <BsThreeDots style={{ zIndex: 1 }} />
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} popperConfig={{
        strategy: 'absolute',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 10], // 수직 오프셋을 조정하여 버튼 바로 아래에 드롭다운 표시
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary: 'viewport',
            },
          },
        ],
      }} style={{ zIndex: 1000, position: 'absolute' }}>

        {/* 메모상단 고정 기능: 추후 구현 예정 */}
        {/* {isPinned ? (
          <Dropdown.Item eventKey="1" onClick={togglePin}>
            <LuPinOff /> Unpin
          </Dropdown.Item>
        ) : (
          <Dropdown.Item eventKey="1" onClick={togglePin}>
            <LuPin /> Pin
          </Dropdown.Item>
        )} */}

        {/* 취소 및 취소의 취소 버튼 */}
        {task.taskStatus == 'CANCELLED' ? (
          <Dropdown.Item eventKey="2" onClick={handleDoReopen}>
            <AiOutlineRollback /> Reopen
          </Dropdown.Item>
        ) : (
          <Dropdown.Item eventKey="2" onClick={() => handleCancel(task)}>
            <MdCancelPresentation /> Won't Do
          </Dropdown.Item>
        )}

        {/* 바탕화면 메모 보이기: 추후 구현 예정 */}
        {/* <Dropdown.Item eventKey="3"><FaRegStickyNote /> Open as sticky note</Dropdown.Item> */}
        {/* 메모 출력 기능: 추후 구현 예정 */}
        {/* <Dropdown.Item eventKey="4"><MdLocalPrintshop /> Print</Dropdown.Item> */}

        {/* 삭제 버튼 */}
        <Dropdown.Item eventKey="5"
          onClick={() => deleteTask(task.no)}><RiDeleteBin6Line /> Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SetTask;