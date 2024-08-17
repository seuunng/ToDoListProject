import React, { useState } from 'react';

import '../styles/basicStyle.css';
import '../styles/menuBar.css';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faGear, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import AccountInfo from '../components/acountInfoModal';
import Setting from '../components/settingModal';
import { AiFillAppstore } from "react-icons/ai";
import ModalModule from '../modules/modalModule';
import axios from '../api/axios';

const MenuBar = ({ setUser, user, lists, smartLists,
  checked, setChecked, isCancelled, setIsCancelled, handleCancel, handleCheckboxChange,
  isSmartList, setIsSmartList }) => {

  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

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
  const defaultList = getStoredItem('defaultList');

  const selectedListNo = selectedList?.no || defaultList?.no || '';

   const handleNavigationError = () => {
    if (!selectedListNo) {
      alert("No valid list selected. Please select a list before proceeding.");
      console.error("No valid list found for navigation.");
      return true; // 오류가 있었음을 나타내기 위해 true를 반환
    }
    return false; // 오류가 없음을 나타내기 위해 false를 반환
  };

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
              pathname: user && selectedListNo ? `/basicBoard/${selectedListNo}` : '',
              state: { checked, isCancelled, selectedList: selectedList?.no || defaultList?.no || '' }
            }}
            className="item"
            onClick={(e) => {
              if (handleNavigationError()) {
                e.preventDefault(); // 네비게이션을 막음
                return;
              }
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