import React from 'react';

import '../styles/basicStyle.css';
import '../styles/menuBar.css';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faGear, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import AccountInfo from './acountInfoModal';
import Setting from './settingModal';

class MenuBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showAccountInfo: false,
        showSettingModal: false,
        id: 'example_id',
        nickname: 'example_nickname',
        created_at: '2024-01-01',
      };
    }
  
    showAccountInfo = () => {
      this.setState({ showAccountInfo: true });
    };
  
    showSettingModal = () => {
      this.setState({ showSettingModal: true });
    };
  
    render() {
      const { showAccountInfo, showSettingModal, id, nickname, created_at } = this.state;
  
  return (
    <div>
    <div className="menuBar">
      <div className="item" onClick={this.showAccountInfo}>
        <FontAwesomeIcon icon={faCat} />
      </div>
      <Link to="/BasicBoard" className="item">
        <FontAwesomeIcon icon={faSquareCheck} />
      </Link>
      <Link to="/MonthlyBoard" className="item">
        <FontAwesomeIcon icon={faCalendarDays} />
      </Link>
      <div className="item" onClick={this.showSettingModal}>
        <FontAwesomeIcon icon={faGear} />
      </div>
    </div>
    {showAccountInfo && (
      <AccountInfo id={id} nickname={nickname} created_at={created_at} />
    )}
    {showSettingModal && <Setting />}
  </div>
  );
}
}

export default MenuBar;