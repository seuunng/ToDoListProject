import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import instance from '../../api/axios';


const FindPW = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post('/auth/findPW', { email });
      toast.success('임시 비밀번호가 이메일로 전송되었습니다!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('등록되지 않은 메일입니다', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signUp');
};
  return (
    <div>
      <div className="accountInfo-container">
        <div className="button-container">
          <div className="todolistMainTitle">
            Todo List
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className='centered login-btn'>
            <input
              type="email"
              style={{ width: "250px", height: "38px" }}
              placeholder='회원가입 시 등록한 Email을 입력해주세요'
              value={email}
              onChange={handleChange} />
          </div>
          <div className='centered login-btn'>
            <Button
              style={{ width: "250px" }}
              onClick={handleSubmit}>
              임시비밀번호 받기
            </Button>
          </div>
          <div className='centered login-btn'>
            <div className='row'
              style={{ width: "250px" }}>
              <span className='col col-7 lefted'
                style={{
                  color: "grey",
                  cursor: "pointer",
                  fontSize: "14px",
                  paddingLeft: 0
                }}
                onClick={handleLogin}>로그인으로 돌아가기</span>
              <span className='col col-5 righted'
                style={{
                  color: "grey",
                  cursor: "pointer",
                  fontSize: "14px",
                  paddingRight: 0
                }}
                onClick={handleSignUp}>회원가입</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default FindPW;