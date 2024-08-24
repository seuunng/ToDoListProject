import React, { useState, useEffect } from 'react';

import '../styles/basicStyle.css';
import '../styles/menuBar.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faGear, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import AccountInfo from '../components/acountInfoModal';
import Setting from '../components/settingModal';
import { AiFillAppstore } from "react-icons/ai";
// 페이지 좌측 메뉴바
const MenuBar = ({ setUser, user, lists, smartLists,
  checked, setChecked, isCancelled, setIsCancelled, handleCancel, handleCheckboxChange,
}) => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [defaultList, setDefaultList] = useState(null);
  // localstorage에 저장된 아이템 
  const getStoredItem = (key) => {
    try {
      const storedItem = localStorage.getItem(key);
      if (!storedItem || storedItem === "undefined") {
        return null;
      }
      return JSON.parse(storedItem);
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage`, error);
      return null;
    }
  };
  // 기본리스트 설정
  useEffect(() => {
    const savedSelectedList = getStoredItem('selectedList');
    const foundList = lists.find(list => list.title === "기본함");
    setDefaultList(foundList); 
    if (savedSelectedList !== null) {
      const isSelectedListValid = lists.some(list => list.no === savedSelectedList.no);
      if (isSelectedListValid) {
        setSelectedList(savedSelectedList);
      } else {
        setSelectedList(foundList);
        localStorage.setItem('selectedList', JSON.stringify(foundList));
      }
    } else {
      setSelectedList(foundList);
      localStorage.setItem('selectedList', JSON.stringify(foundList));
    }
  }, [user, lists]);



  // 베이직보드로 연결되는 리스트 번호 선택
  const selectedListNo = selectedList?.no || (lists.length > 0 ? lists[0].no : null);

  return (
    <div>
      {user ?
        <div className="menuBar">
          <div className="item" onClick={() => setShowAccountInfo(true)}>
            {user ? <FontAwesomeIcon icon={faCat} /> : <AiFillAppstore />}
          </div>

          {/* 베이직보드로 이동 */}
          <Link
            to={{
              pathname: user ? `/basicBoard/${selectedListNo}` : '',
              state: { checked, isCancelled, selectedList: selectedList?.no || '' }
            }}
            className="item"
            onClick={(e) => {
              setChecked(false);
              setIsCancelled(false);
              handleCheckboxChange();
              handleCancel();
            }}>
            <FontAwesomeIcon icon={faSquareCheck} />
          </Link>

          {/* 먼슬리보드로 이동 */}
          <Link
            to={{
              pathname: user ? "/monthlyBoard" : '',
              state: { checked, isCancelled }
            }}
            className="item"
            checked={checked}
            onClick={() => {
              setChecked(false);
              setIsCancelled(false);
              handleCheckboxChange();
              handleCancel();
            }}>
            <FontAwesomeIcon icon={faCalendarDays} />
          </Link>
          <div className="item" onClick={user ? () => setShowSettingModal(true) : () => { }}>
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div>
        : ''}
      {/* 어카운트인포 모달 */}
      <AccountInfo
        user={user}
        setUser={setUser}
        show={showAccountInfo}
        onHide={() => setShowAccountInfo(false)}
      />
      {/* 설정 모달 */}
      <Setting
        show={showSettingModal}
        user={user}
        lists={lists}
        smartLists={smartLists}
        onHide={() => setShowSettingModal(false)}
      />
    </div>
  );
}


export default MenuBar;