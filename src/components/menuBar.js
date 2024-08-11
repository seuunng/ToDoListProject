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

const MenuBar = ({ setUser, user,
  checked, setChecked, isCancelled, setIsCancelled, handleCancel, handleCheckboxChange }) => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

  const navigate = useNavigate();

  const handleSubButtonClick = () => {
    setShowAccountInfo(false);
    navigate('/mainAccountInfo');
  };

  return (
    <div>
      {user ?
        <div className="menuBar">
          <div className="item" onClick={() => setShowAccountInfo(true)}>
            {user ? <FontAwesomeIcon icon={faCat} /> : <AiFillAppstore />}
          </div>
          <Link
            to={{
              pathname: user ? "/mainBoard/basic" : '',
              state: { checked, isCancelled }
            }}
            className="item"
            // checked={checked}
            // isCancelled={isCancelled}
            onClick={() => {
              setChecked(false);
              setIsCancelled(false);
              handleCheckboxChange();
              handleCancel();
            }}>
            <FontAwesomeIcon icon={faSquareCheck} />
          </Link>
          <Link 
            to={{
              pathname: user ? "/monthlyBoard" : '',
              state: { checked, isCancelled }
            }}
            className="item"
            checked={checked}
            // // setChecked={setChecked}  
            // isCancelled={isCancelled}
            // setIsCancelled={setIsCancelled}
            // handleCancel={handleCancel}
            // handleCheckboxChange={handleCheckboxChange}
            
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
        onHide={() => setShowSettingModal(false)}
      />
    </div>
  );
}


export default MenuBar;