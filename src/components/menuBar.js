import React, { useState }  from 'react';

import '../styles/basicStyle.css';
import '../styles/menuBar.css';

import { Link, useNavigate  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faGear, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import AccountInfo from '../components/acountInfoModal';
import Setting from '../components/settingModal';

import ModalModule from '../modules/modalModule';

const MenuBar = () => {
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false);

  // const showAccountInfo = () => {
  //   setShowAccountInfo(true);
  // };

  // const hideAccountInfo = () => {
  //   setShowAccountInfo(false);
  // };

  // const showSettingModal = () => {
  //   setShowSettingModal(true);
  // };

  // const hideSettingModal = () => {
  //   setShowSettingModal(false);
  // };
  const navigate = useNavigate();

  const handleSubButtonClick = () => {
    setShowAccountInfo(false);
    navigate('/logout');
  };

  // render() {
  //   const { showAccountInfo, showSettingModal, id, nickname, created_at } = state;

    return (
      <div>
        <div className="menuBar">
          <div className="item" onClick={() => setShowAccountInfo(true)}>
            <FontAwesomeIcon icon={faCat} />
          </div>
          <Link to="/basicBoard" className="item">
            <FontAwesomeIcon icon={faSquareCheck} />
          </Link>
          <Link to="/monthlyBoard" className="item">
            <FontAwesomeIcon icon={faCalendarDays} />
          </Link>
          <div className="item" onClick={() => setShowSettingModal(true)}>
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div>

        <ModalModule
          show={showAccountInfo}
          onHide={() => setShowAccountInfo(false)}
          modalTitle="Account Info"
          context={
            <AccountInfo 
              onHide={() => setShowAccountInfo(false)}
            />
          }
          btnSubTitle="로그아웃"
          btnTitle="확인"
          onSubButtonClick={handleSubButtonClick}
        />

        <ModalModule
          show={showSettingModal}
          onHide={() => setShowSettingModal(false)}
          modalTitle="Setting"
          context={
            <Setting 
              onHide={() => setShowSettingModal(false)} />
          }
          btnTitle="저장"
        />
      </div>
    );
  }


export default MenuBar;