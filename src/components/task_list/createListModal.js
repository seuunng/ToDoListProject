import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { TfiMenu } from "react-icons/tfi";
import { MdSignalCellularNull } from 'react-icons/md';

const CreateList = ({ show, onHide, lists, count, addList }) => {
  const modalRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [newList, setNewList] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedColor,setSelectedColor] = useState('');

  const handleEmojiClick = (emojiObject, event) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  }
  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const createList = () => {
    if (newList.trim()) {
      const list = {
        title: newList,
        icon: selectedEmoji,
        color: selectedColor,
      };
      addList(list);
      setNewList('');
      setSelectedEmoji('');
      setSelectedColor('');
      onHide();
    }
  };
  const colorOptions = ['lightPink', 'lightGreen', 'lightBlue'];
  
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header>
        <Modal.Title>Add List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <InputGroup className="mb-3">
            <Button variant="outline-secondary" id="button-addon1" onClick={toggleEmojiPicker}>
              {selectedEmoji ? selectedEmoji : <TfiMenu />}
            </Button>
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
            <div className="checkbox box" style={{ color: "black" }}>
              <input type="checkbox" />&emsp;
              스마트 목록에서 안보이게하고 싶어요
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          취소
        </Button>
        <Button onClick={createList}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateList;