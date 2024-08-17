import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/basicStyle.css';
import DropdownBtn from '../modules/dropdownModule';
import SwitchBtn from '../modules/switchButtonModule';
import BasicBtn from '../modules/BasicButton';
import Col from 'react-bootstrap/Col';
import { Modal, Button } from 'react-bootstrap';
import { useSettings } from '../contexts/SettingsContext';
import SelectedList from '../components/task_list/selectedList'
import { useParams, useOutletContext, useLocation } from 'react-router-dom';
import { FaTools } from "react-icons/fa";

const SettingModal = ({ show, onHide, lists, smartLists }) => {
  
//   const { 
//     tasks = [], 
//     updateTask = () => {}, 
//     lists = [], 
//     smartLists = [], 
//     setSmartLists = () => {}, 
// } = useOutletContext() || {};

  const { selectedOptions, setSelectedOptions, switches, setSwitches } = useSettings(null);
  // const [show, setShow] = useState(false);
  // const settingModalRef = useRef(null);
  const [allSwitchesList, setAllSwitchesList] = useState(true);
  const [allSwitchesAlarm, setAllSwitchesAlarm] = useState(true);
  const [selectedList, setSelectedList] = useState(true);
  const [defaultList, setDefaultList] = useState(null);

  const dropdownOptionsWeek = ["월요일", "일요일"];
  const dropdownOptionsTime = ["12시간", "24시간"];
  const dropdownOptionsAlarmTime = ["정각", "5분전", "30분전", "하루전"];
  const dropdownOptionsAlarmMethod = ["이메일", "카톡알림", "팝업"];
  const dropdownOptionsAlarmSound = ["벨소리", "진동", "무음"];

  useEffect(() => {
    if (lists && lists.length > 0) {
      const defaultList = lists.find(list => list.title === "기본함");
      if (defaultList) {
        setDefaultList(defaultList);
      }
      console.log("SettingModal", defaultList)
    }
  }, []);

  useEffect(() => {
    // 로컬 스토리지에서 설정 값 불러오기
    const savedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    const savedSwitches = JSON.parse(localStorage.getItem('switches'));
    const savedSelectedList = JSON.parse(localStorage.getItem('selectedList'));
    const savedAllSwitchesList = JSON.parse(localStorage.getItem('allSwitchesList'));
    const savedAllSwitchesAlarm = JSON.parse(localStorage.getItem('allSwitchesAlarm'));
    const savedDefaultList = JSON.parse(localStorage.getItem('defaultList'));
   
    if (savedOptions) {
      setSelectedOptions(savedOptions);
    }
    if (savedSwitches) {
      setSwitches(savedSwitches);
    }
    if (savedAllSwitchesList !== null) {
      setAllSwitchesList(savedAllSwitchesList);
    }
    if (savedAllSwitchesAlarm !== null) {
      setAllSwitchesAlarm(savedAllSwitchesAlarm);
    }
    if (savedSelectedList !== null) {
      setSelectedList(savedSelectedList);
    }
    if (savedDefaultList) {
      setDefaultList(savedDefaultList); // 기본 리스트 설정
    }
  }, [lists, smartLists]);

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
      completed: newState,
      deleted: newState,
    });
  };

  const toggleAllSwitchesAlarm = () => {
    setAllSwitchesAlarm(!allSwitchesAlarm);
  };

  const savedSetting = () => {
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    localStorage.setItem('switches', JSON.stringify(switches));
    localStorage.setItem('allSwitchesList', JSON.stringify(allSwitchesList));
    localStorage.setItem('allSwitchesAlarm', JSON.stringify(allSwitchesAlarm));
    localStorage.setItem('selectedList', JSON.stringify(selectedList));
    localStorage.setItem('defaultList', JSON.stringify(defaultList)); 
    onHide();
  }
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title><FaTools /> 설정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="setting container">
          <div>
            <h5><strong>날짜&시간 설정</strong></h5>
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
                <h5><strong>알람 설정</strong></h5>
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
          <div className="d-flex align-items-center line row">
            <Col>
              <h5><strong>대표 목록 설정</strong></h5>
            </Col>
            <Col className='righted'>
              <SelectedList
                lists={lists}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                updateTask={()=>{}}
              />
            </Col>
          </div>
          <hr />
          <div>
            <div className="d-flex align-items-center line row">
              <Col>
                <h5><strong>스마트목록 설정</strong></h5>
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
                <h5>모든 할 일</h5>
              </Col>
              <Col className='righted'>
                <SwitchBtn
                  checked={switches.defaultBox}
                  disabled={false}
                  onChange={() => setSwitches({ ...switches, defaultBox: !switches.defaultBox })}
                />
              </Col>
            </div>
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
                <h5>다음주 할 일</h5>
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
                <h5>완료한 할 일</h5>
              </Col>
              <Col className='righted'>
                <SwitchBtn
                  checked={switches.completed}
                  disabled={!allSwitchesList}
                  onChange={() => setSwitches({ ...switches, completed: !switches.completed })}
                />
              </Col>
            </div>
            <div className="d-flex align-items-center line row">
              <Col>
                <h5>취소한 할 일</h5>
              </Col>
              <Col className='righted'>
                <SwitchBtn
                  checked={switches.deleted}
                  disabled={!allSwitchesList}
                  onChange={() => setSwitches({ ...switches, deleted: !switches.deleted })}
                />
              </Col>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={savedSetting}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;