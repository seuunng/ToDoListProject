import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoReorderThree } from "react-icons/io5";
//리스트선택 드롭박스 보이기 기능
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
//리스트 선택 Dropdown.Menu 의 커스텀
const Lists = React.forwardRef(
  //aria-labelledby: 이 속성은 웹 접근성을 향상시키기 위해 사용되는 ARIA의 속성
  //labeledBy: 이는 부모 컴포넌트로부터 전달된 prop
  //ref: ref는 React에서 특정 DOM 요소나 컴포넌트 인스턴스에 접근하기 위해 사용
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
//리스트 선택 기능
const SelectedList = ({ lists, selectedList, 
  setSelectedList, tasks, updateTask,
  }) => {
  if (!lists || !Array.isArray(lists)) {
    return null; 
  }
  const filteredLists = lists.filter(list => !list.isDeleted);
  const handleSelect = (list) => {
    setSelectedList(list);
  };
  return (
    <Dropdown>
      {/* 드롭다운 버튼 */}
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
      {/* 드롭다운 메뉴 */}
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