import React, { useState } from 'react';
import '../styles/basicStyle.css';
import Col from 'react-bootstrap/Col';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AcountInfoModal = ({ onHide , user = {}, setUser, show }) => {

  const { email = '', nickname = '', created_at = '' } = user || {};
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [editableEmail, setEditableEmail] = useState(email);
  const [editableNickname, setEditableNickname] = useState(nickname);
  const [editableCreatedAt, setEditableCreatedAt] = useState(created_at);
  
  const navigate = useNavigate();

  const handleUpdateSimplePW = () => {
    onHide();
    navigate('/updateSimplePW');
  };

  const handleUpdatePW = () => {
    onHide();
    navigate('/findPW');
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      if (user) {
        console.log(`현재 로그아웃한 유저는 ${user.nickname} 입니다`);
      }
      onHide();
      navigate('/mainAccountInfo');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const savedSetting = () => {
    onHide();
  }
  const handleDoubleClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const userCreatedAtFormatted = formatDate(user?.created_at);

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // This formats the date as YYYY-MM-DD
  }

  if (!user) {
    return null; // 또는 적절한 fallback UI를 반환
  }
  
  return (
    <Modal show={show} onHide={onHide} centered>
    <Modal.Header>
      <Modal.Title>Account Info</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className="acountInfo container">
      <div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>이메일</h5>
          </Col>
          <Col className='righted'>
            <div onDoubleClick={() => handleDoubleClick('email')}>
              {!isEditing.email ? editableEmail : (
                <input
                  value={editableEmail}
                  onChange={(e) => setEditableEmail(e.target.value)}
                  onBlur={() => handleBlur('email')} />
              )}
            </div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>닉네임</h5>
          </Col>
          <Col className='righted'>  
            <div onDoubleClick={() => handleDoubleClick('nickname')}>
              {!isEditing.nickname ? editableNickname : (
                    <input
                      value={editableNickname}
                      onChange={(e) => setEditableNickname(e.target.value)}
                      onBlur={() => handleBlur('nickname')}
                    />
                  )}
                </div>
          </Col>
        </div>
        <div className="d-flex align-items-center line row" style={{margin: '12px'}}>
          <Col>
            <h5>가입일</h5>
          </Col>  
          <Col className='righted'>
            <div onDoubleClick={() => handleDoubleClick('created_at')}>
            {!isEditing.created_at ? userCreatedAtFormatted : (
                    <input
                      value={editableCreatedAt}
                      onChange={(e) => setEditableCreatedAt(e.target.value)}
                      onBlur={() => handleBlur('created_at')}
                    />
                  )}
                </div>
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
    </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleLogout} variant="outline-dark">
        로그아웃
        </Button>
        <Button onClick={savedSetting}>
        확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcountInfoModal;