import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { TfiMenu } from "react-icons/tfi";

//List 생성 및 수정 모달 
const CreateList = ({ show, onHide, lists, addList, updateList, isEditMode }) => {
  //상태관리
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newList, setNewList] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(lists?.icon || '');
  const [selectedColor, setSelectedColor] = useState(lists?.color || '');
  //리스트 컬러 옵션: 추가 가능
  const colorOptions = [
    'lightPink',        // 밝은 핑크
    'lightBlue',        // 밝은 파랑
    'lightSalmon',      // 밝은 연어색
    'lightSkyBlue',     // 밝은 하늘색
    'lavender',         // 라벤더
    'peachPuff',        // 복숭아 색
    'powderBlue',       // 가루 파랑
    'moccasin',         // 모카신
    'navajoWhite',      // 나바호 화이트
    'thistle',          // 엉겅퀴 색
  ]
  //모달이 수정을 위해 열릴때 수정전 값을 렌더링
  useEffect(() => {
    if (isEditMode && lists) {
      setNewList(lists.title);
      setSelectedEmoji(lists.icon);
      setSelectedColor(lists.color);
    }
  }, [isEditMode, lists]);
  //이모지피커 열리고 닫는 기능
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  //이모지 선택시 저장하는 기능+이모지피커 닫기
  const handleEmojiClick = (emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  }
  //리스트 색 선택시 저장하는 기능
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  //저장 클릭시 실행, 수정모드일때는 수정, 생성모드일때는 생성
  const handleSave = () => {
    if (newList.trim()) {
      const updatedList = {
        ...lists,
        title: newList,
        icon: selectedEmoji,
        color: selectedColor,
      };
      if (isEditMode) {
        updateList(updatedList);
      } else {
        addList(updatedList);
      }
      //모달 양식 초기화
      setNewList('');
      setSelectedEmoji('');
      setSelectedColor('');
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>{isEditMode ? 'Edit List' : 'Add List'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-body">
          <InputGroup className="mb-3">
            {/* 이모지피커 */}
            <Button variant="outline-secondary" id="button-addon1" onClick={toggleEmojiPicker}>
              {selectedEmoji ? selectedEmoji : <TfiMenu />}
            </Button>
            {/* 리스트제목 */}
            <Form.Control
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder="Name"
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
          </InputGroup>
          {showEmojiPicker && (
            <div style={{ position: 'absolute', zIndex: 1000 }}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <div className="d-flex align-items-center choseColor item">
            <div className="colorTitle box" style={{ color: "black" }}>Color&emsp;</div>
            {/* 컬러팔레트 */}
            <div className="colorItem box">
              {colorOptions.map(color => (
                <div
                  key={color}
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                  onClick={() => handleColorClick(color)}
                >
                  <i className="fa-solid fa-circle" style={{ color, fontSize: '24px' }}></i>
                  {selectedColor === color && (
                    <i
                      className="fa-solid fa-check"
                      style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        margin: 'auto',
                        color: 'white',
                        fontSize: '16px',
                        textAlign: 'center',
                        lineHeight: '24px',
                      }}
                    ></i>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex align-items-center isSmartList item">

            {/* 스마트 목록에 렌더링여부 선택 기능: 추후 구현 예정 */}
            {/* <div className="checkbox box" style={{ color: "black" }}>
              <input type="checkbox" />&emsp;
              스마트 목록에서 안보이게하고 싶어요
            </div> */}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          취소
        </Button>
        <Button onClick={handleSave}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateList;