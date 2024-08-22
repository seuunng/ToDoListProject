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
  const [defaultList, setDefaultList] = useState('');

  const getStoredItem = (key) => {
     try {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : null;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage`, error);
      return null;
    }
  };
  const selectedList = getStoredItem('selectedList');
  // const defaultList = getStoredItem('defaultList');

  const selectedListNo = selectedList?.no || defaultList?.no || '';

  // console.log(defaultList, selectedListNo, selectedList, );
  useEffect(() => {
    if (lists && lists.length > 0) {
      const defaultList = lists.find(list => list.title === "기본함");
      if (defaultList) {
        setDefaultList(defaultList);
      } else {
        setDefaultList(lists[0]);  // 기본함이 없으면 첫 번째 리스트로 설정
      }
      console.log("MenuBar", defaultList)
    }
  }, [user]);

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
              state: { checked, isCancelled, selectedList: selectedList?.no || defaultList?.no || '' }
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
              console.log('Calling setChecked:', typeof setChecked);
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
      <AccountInfo
        user={user}
        setUser={setUser}
        show={showAccountInfo}
        onHide={() => setShowAccountInfo(false)}
      />
      <Setting
        show={showSettingModal}
        
        lists={lists}
        smartLists={smartLists}
        onHide={() => setShowSettingModal(false)}
      />
    </div>
  );
}


export default MenuBar;