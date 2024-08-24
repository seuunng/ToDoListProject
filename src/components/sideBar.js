import React, { useState } from 'react';
import '../styles/basicStyle.css';
import '../styles/sideBar.css';
import ListItemsBox from './task_state/listItemsBox';
import CreateList from './task_list/createListModal';
// 토글로 보여지는 리스트목록이 포함된 사이드바
const SideBar = ({ toggleSidebar,
  lists, addList, updateList, deleteList,
  smartLists, setIsSmartList,
  checked, setChecked, isCancelled, setIsCancelled, handleCancel, handleCheckboxChange }) => {
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  //로컬스토리지 저장된 설정값 불러오기
  const switches = JSON.parse(localStorage.getItem('switches')) || {
    defaultBox: true,
    today: true,
    tomorrow: true,
    next7Days: true,
    completed: true,
    deleted: true
  };
  //설정값 기준으로 렌더링할 리스트 필터
  const filteredSmartLists = smartLists.filter(list => {
    if (list.title === '모든 할 일') return switches.defaultBox ?? false;
    if (list.title === '오늘 할 일') return switches.today ?? false;
    if (list.title === '내일 할 일') return switches.tomorrow ?? false;
    if (list.title === '다음주 할 일') return switches.next7Days ?? false;
    if (list.title === '완료한 할 일') return switches.completed ?? false;
    if (list.title === '취소한 할 일') return switches.deleted ?? false;
    return false;
  });
  //삭제된 리스트 필터
  const filteredLists = lists.filter(list => !list.isDeleted);
  //리스트 생성 모달 보이기 기능
  const showCreateList = () => {
    setShowCreateListModal(true);
  };
  return (
    <div>
      <div className="sideBar">
        <div className="content">
          <div className="listCont">
            {/* 스마트 리스트 목록 */}
            <div className="d-flex align-items-center title">
              <h6 className="item">Smart Lists</h6>
            </div>
            <div className="list">
              <ListItemsBox
                lists={filteredSmartLists}
                toggleSidebar={toggleSidebar}
                deleteList={deleteList}
                updateList={updateList}
                checked={checked}
                setChecked={setChecked}
                isCancelled={isCancelled}
                setIsCancelled={setIsCancelled}
                handleCancel={handleCancel}
                handleCheckboxChange={handleCheckboxChange}
                isSmartList={true}
                setIsSmartList={setIsSmartList}
                />
            </div>
          </div>
          <hr />
          <div className="listCont">
            {/* 사용자 작성 리스트 목록  */}
            <div className="d-flex align-items-center title">
              <h6 className="item">Lists</h6>
              <i className="fa-solid fa-plus" onClick={showCreateList}></i>
            </div>
            <div className="list">
              <ListItemsBox
                lists={filteredLists}
                toggleSidebar={toggleSidebar}
                deleteList={deleteList}
                updateList={updateList}
                checked={checked}
                setChecked={setChecked}
                isCancelled={isCancelled}
                setIsCancelled={setIsCancelled}
                handleCancel={handleCancel}
                handleCheckboxChange={handleCheckboxChange}
                isSmartList={false}
                setIsSmartList={setIsSmartList}
              />
            </div>
          </div>
        </div>
      </div>
      {showCreateListModal && (
        <CreateList
          show={showCreateListModal}
          onHide={() => setShowCreateListModal(false)}
          icon="&"
          list="할일목록"
          count="20"
          color="red"
          lists={lists}
          addList={addList}
        />
      )}
    </div>
  )
}

export default SideBar;