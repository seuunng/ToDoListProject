import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/basicStyle.css';
import DropdownBtn from '../modules/dropdownModule';
import SwitchBtn from '../modules/switchButtonModule';
import BasicBtn from '../modules/BasicButton';
import Col from 'react-bootstrap/Col';

const SettingModal = () => {
  const settingModalRef = useRef(null);
  const [allSwitchesList, setAllSwitchesList] = useState(true);
  const [allSwitchesAlarm, setAllSwitchesAlarm] = useState(true);

  const dropdownOptionsWeek = ["월요일", "일요일"];
  const dropdownOptionsTime = ["12시간", "24시간"];
  const dropdownOptionsAlarmTime = ["정각", "10분전", "30분전", "하루전"];
  const dropdownOptionsAlarmMethod = ["이메일", "카톡알림", "팝업"];
  const dropdownOptionsAlarmSound = ["벨소리", "진동", "무음"];

  const [selectedOptions, setSelectedOptions] = useState({
    week: "선택",
    time: "선택",
    alarmTime: "선택",
    alarmMethod: "선택",
    alarmSound: "선택",
  });

  const [switches, setSwitches] = useState({
    today: false,
    tomorrow: false,
    next7Days: false,
    defaultBox: false,
  });

  const handleOptionSelected = (type, option) => {
    setSelectedOptions({ ...selectedOptions, [type]: option });
  };

  const toggleAllSwitchesList = () => {
    const newState = !allSwitchesList;
    setAllSwitchesList(newState);
    setSwitches({
      today: newState,
      tomorrow: newState,
      next7Days: newState,
      defaultBox: newState,
    });
  };

  const toggleAllSwitchesAlarm = () => {
    setAllSwitchesAlarm(!allSwitchesAlarm);
  };

  const showModal = () => {
    const modal = new window.bootstrap.Modal(settingModalRef.current);
    modal.show();
  };

  return (
    <div className="setting container">
      <div>
        <h4>날짜&시간 설정</h4>
        <hr />
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>시간형식</h5>
          </Col>
          <Col className='righted'>
            <DropdownBtn
              options={dropdownOptionsTime}
              selectedOption={selectedOptions.time}
              onOptionSelected={(option) => handleOptionSelected('time', option)}
            />
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>주시작날짜</h5>
          </Col>
          <Col className='righted'>
            <DropdownBtn
              options={dropdownOptionsWeek}
              selectedOption={selectedOptions.week}
              onOptionSelected={(option) => handleOptionSelected('week', option)}
            />
          </Col>
        </div>
      </div>
      <hr />
      <div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h4>알람 설정</h4>
          </Col>
          <Col className='righted'>
            <SwitchBtn
              checked={allSwitchesAlarm}
              onChange={toggleAllSwitchesAlarm}
            />
          </Col>
        </div>
        <hr />
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>기본 알림기간</h5>
          </Col>
          <Col className='righted'>
            <DropdownBtn
              options={dropdownOptionsAlarmTime}
              disabled={!allSwitchesAlarm}
              selectedOption={selectedOptions.alarmTime}
              onOptionSelected={(option) => handleOptionSelected('alarmTime', option)}
            />
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>기본 알림방법</h5>
          </Col>
          <Col className='righted'>
            <DropdownBtn
              options={dropdownOptionsAlarmMethod}
              disabled={!allSwitchesAlarm}
              selectedOption={selectedOptions.alarmMethod}
              onOptionSelected={(option) => handleOptionSelected('alarmMethod', option)}
            />
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>기본 알림소리</h5>
          </Col>
          <Col className='righted'>
            <DropdownBtn
              options={dropdownOptionsAlarmSound}
              disabled={!allSwitchesAlarm}
              selectedOption={selectedOptions.alarmSound}
              onOptionSelected={(option) => handleOptionSelected('alarmSound', option)}
            />
          </Col>
        </div>
      </div>
      <hr />
      <div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h4>스마트목록 설정</h4>
          </Col>
          <Col className='righted'>
            <SwitchBtn
              checked={allSwitchesList}
              onChange={toggleAllSwitchesList}
            />
          </Col>
        </div>
        <hr />
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>오늘 할 일</h5>
          </Col>
          <Col className='righted'>
            <SwitchBtn
              checked={switches.today}
              disabled={!allSwitchesList}
              onChange={() => setSwitches({ ...switches, today: !switches.today })}
            />
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>내일 할 일</h5>
          </Col>
          <Col className='righted'>
            <SwitchBtn
              checked={switches.tomorrow}
              disabled={!allSwitchesList}
              onChange={() => setSwitches({ ...switches, tomorrow: !switches.tomorrow })}
            />
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>다음 7일 할 일</h5>
          </Col>
          <Col className='righted'>
            <SwitchBtn
              checked={switches.next7Days}
              disabled={!allSwitchesList}
              onChange={() => setSwitches({ ...switches, next7Days: !switches.next7Days })}
            />
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>기본함</h5>
          </Col>
          <Col className='righted'>
            <SwitchBtn
              checked={switches.defaultBox}
              disabled={!allSwitchesList}
              onChange={() => setSwitches({ ...switches, defaultBox: !switches.defaultBox })}
            />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;