import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../styles/basicStyle.css';
import DropdownBtn from '../modules/dropdownModule';
import SwitchBtn from '../modules/switchButtonModule';
import Col from 'react-bootstrap/Col';
import { Modal, Button } from 'react-bootstrap';
import SelectedList from '../components/task_list/selectedList'
import { FaTools } from "react-icons/fa";
import instance from '../api/axios';
// 설정 모달
const SettingModal = ({ user, show, onHide, lists, smartLists }) => {

  const [allSwitchesList, setAllSwitchesList] = useState(true);
  const [selectedList, setSelectedList] = useState(null);
  const [defaultList, setDefaultList] = useState(null);

  const dropdownOptionsWeek = ["월요일", "일요일"];
  const dropdownOptionsTime = ["12시간", "24시간"];
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
  // 로컬스토리지 값 불러오기
  const getStoredItem = (key, fallbackValue = null) => {
    try {
      const storedItem = localStorage.getItem(key);
      // Check for invalid values like undefined, null, or "undefined"
      if (!storedItem || storedItem === "undefined") {
        return fallbackValue;
      }
      return JSON.parse(storedItem);
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage`, error);
      return fallbackValue;
    }
  };
  // 설정값들 초기화
  useEffect(() => {
    const savedOptions = getStoredItem('selectedOptions', {});
    const savedSwitches = getStoredItem('switches', {});
    const savedSelectedList = getStoredItem('selectedList', null);
    const savedAllSwitchesList = getStoredItem('allSwitchesList', true);
    if (savedOptions) {
      setSelectedOptions(savedOptions);
    }
    if (savedSwitches) {
      setSwitches(savedSwitches);
    }
    if (savedAllSwitchesList !== null) {
      setAllSwitchesList(savedAllSwitchesList);
    }
    const foundList = lists.find(list => list.title === "기본함");
    if (lists && lists.length > 0 && user) {
      setDefaultList(foundList);
    }
    if (savedSelectedList !== null) {
      const isSelectedListValid = lists.some(list => list.no === savedSelectedList.no);
      if (isSelectedListValid) {
        setSelectedList(savedSelectedList);
      } else {
        setSelectedList(foundList);
        localStorage.setItem('selectedList', JSON.stringify(selectedList));
      }
    } else {
      setSelectedList(foundList);
      localStorage.setItem('selectedList', JSON.stringify(selectedList));
    }
  }, [user, lists, smartLists]);
  // 옵션 선택 기능
  const handleOptionSelected = (type, option) => {
    setSelectedOptions({ ...selectedOptions, [type]: option });
  };
  // 스위치 버튼 선택 기능
  const toggleAllSwitchesList = () => {
    const newState = !allSwitchesList;
    setAllSwitchesList(newState);
    setSwitches({
      defaultBox: newState,
      today: newState,
      tomorrow: newState,
      next7Days: newState,
      completed: newState,
      deleted: newState,
    });
  };
  // 설정값 로컬스토리지에 저장+모달 닫기
  const savedSetting = async () => {
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    localStorage.setItem('switches', JSON.stringify(switches));
    localStorage.setItem('allSwitchesList', JSON.stringify(allSwitchesList));
    localStorage.setItem('selectedList', JSON.stringify(selectedList));
    localStorage.setItem('defaultList', JSON.stringify(defaultList));
    console.log(selectedList)
    if (selectedList) {
      const updatedUser = {
        // ...user,
        id: user.id,
        mainListNo: selectedList.no,  // 선택한 대표 목록 번호로 유저 정보를 업데이트
      };
      await updateUser(updatedUser);  // 데이터베이스에 저장
    }
  
    onHide();
  }
  //유저정보 수정
  const updateUser = async (updatedUser) => {
    console.log(updatedUser)
    try {
        const response = await instance.put(`/users/user/${updatedUser.id}`, updatedUser);
        setSelectedList(response.data.mainListNo);
        console.log(response)
    } catch (error) {
        console.error('Error updating user_selectedList:', error);
    }
};
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
          {/* 알람설정 */}
          {/* 
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
          <hr />*/}

          <div className="d-flex align-items-center line row">
            <Col>
              <h5><strong>대표 목록 설정</strong></h5>
            </Col>
            <Col className='righted'>
              <SelectedList
                lists={lists}
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                updateTask={() => {}}
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