import React from 'react';
import '../../styles/basicStyle.css';
// import '../../styles/updatePW.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


const FindPW = () => {
  const navigate = useNavigate();
  const showLoginContainer = () => {
    navigate('/logout', { state: { activeContainer: 'login' } });
  };

  const handleUpdatePW = () => {
    navigate('/updatePW');
  };
  
  const showSignUpContainer = () => {
    navigate('/logout', { state: { activeContainer: 'signUp' } });
  };
  return (
    <div>
      <div>
        <h4 className="list-title">비밀번호 재설정</h4>
      </div>
      <div className="accountInfo-container">
        <div className="button-container">
          <div className='centered login-btn'>
            <input
              type="email"
              style={{ width: "250px", height: "38px" }}
              placeholder='Email' />
          </div>
          <div className='centered login-btn'>
            <Button
              style={{ width: "250px" }}>
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
                  paddingLeft:0
                }}
                onClick={showLoginContainer}>로그인으로 돌아가기</span>
              <span className='col col-5 righted'
                style={{
                  color: "grey",
                  cursor: "pointer",
                  fontSize: "14px",
                  paddingRight:0
                }}
                onClick={showSignUpContainer}>회원가입</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPW;