import React, { useState } from 'react';
import '../styles/basicStyle.css';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const AcountInfoModal = ({ id, nickname, created_at, onHide  }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [editableId, setEditableId] = useState(id);
  const [editableNickname, setEditableNickname] = useState(nickname);
  const [editableCreatedAt, setEditableCreatedAt] = useState(created_at);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  const navigate = useNavigate();

  const handleUpdateSimplePW = () => {
    onHide();
    navigate('/updateSimplePW');
  };

  const handleUpdatePW = () => {
    onHide();
    navigate('/updatePW');
  };

  return (
    <div className="acountInfo container">
      <div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>이메일</h5>
          </Col>
          <Col className='righted'>
            <div>{!isEditing ? id : <input value={editableId} onChange={(e) => setEditableId(e.target.value)} />}</div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>닉네임</h5>
          </Col>
          <Col className='righted'>  
            <div>{!isEditing ? nickname : <input value={editableNickname} onChange={(e) => setEditableNickname(e.target.value)} />}</div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>가입일</h5>
          </Col>  
          <Col className='righted'>
            <div>{!isEditing ? created_at : <input value={editableCreatedAt} onChange={(e) => setEditableCreatedAt(e.target.value)} />}</div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>간편로그인설정</h5>
          </Col>  
          <Col className='righted'>
          <Button variant="light" onClick={handleUpdateSimplePW}>설정</Button>
          </Col> 
        </div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>비밀번호 변경</h5>
          </Col>
          <Col className='righted'>
            <Button variant="light" onClick={handleUpdatePW}>변경</Button>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default AcountInfoModal;