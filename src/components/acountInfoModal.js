import React, { useState } from 'react';
import '../styles/basicStyle.css';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const AcountInfoModal = ({ id, nickname, created_at }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [editableId, setEditableId] = useState(id);
  const [editableNickname, setEditableNickname] = useState(nickname);
  const [editableCreatedAt, setEditableCreatedAt] = useState(created_at);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className="acountInfo container">
      <div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>이메일</h5>
          </Col>
          <Col className='righted'>
            <div>{!isEditing ? id : <input value={editableId} onChange={(e) => setEditableId(e.target.value)} />}</div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>닉네임</h5>
          </Col>
          <Col className='righted'>  
            <div>{!isEditing ? nickname : <input value={editableNickname} onChange={(e) => setEditableNickname(e.target.value)} />}</div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>가입일</h5>
          </Col>  
          <Col className='righted'>
            <div>{!isEditing ? created_at : <input value={editableCreatedAt} onChange={(e) => setEditableCreatedAt(e.target.value)} />}</div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>간편로그인설정</h5>
          </Col>  
          <Col className='righted'>
          <Button variant="light">설정</Button>
          </Col> 
        </div>
        <div className="d-flex align-items-center line row">
          <Col>
            <h5>비밀번호 변경</h5>
          </Col>
          <Col className='righted'>
            <Button variant="light">변경</Button>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default AcountInfoModal;