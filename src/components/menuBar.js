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

  if (!selectedListNo) {
    console.error("No valid list found for navigation.");
    // 여기에서 에러를 핸들링할 수 있습니다. 예를 들어, 기본 페이지로 리다이렉트하거나 사용자에게 경고 메시지를 표시합니다.
  }

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
              pathname: user ? `/basicBoard/${selectedList?.no || defaultList?.no || ''}` : '',
              state: { checked, isCancelled, selectedList: selectedList?.no || defaultList?.no || '' }
            }}
            className="item"
            onClick={() => {
              if (!selectedListNo) {
                console.error("No list selected for navigation.");
                return; // 더 이상 진행하지 않도록 return
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