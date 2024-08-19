import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

const UpdatePW = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidPW, setIsValidPW] = useState(true);
  const [isValidNewPW, setIsValidNewPW] = useState(true);

  const handleChangePW = (e) => {
    setPassword(e.target.value);
    setIsValidPW(true);
  };
  const handleChangeNewPW = (e) => {
    setNewPassword(e.target.value);
    setIsValidNewPW(true);
  };

  const handleSubmit = async (e) => {

    if (!validatePassword(password)) {
      console.log("heandleSumit 실행")
      setIsValidPW(false);
      return;
    }
    if (!validatePassword(newPassword)) {
      setIsValidNewPW(false);
      return;
    }
    if (!validatePassword2(password, newPassword)) {
      setIsValidNewPW(false);
      return;
    }

    try {
      const response = await instance.post('/auth/updatePW', {
        email,
        password,
        newPassword,
      });
      if (response.status === 201) {
        toast.success(`비밀번호가 변경되었습니다. 로그인해주세요!`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login');
      } else {
        toast.error('비밀번호 변경에 실패하였습니다. 정보를 확인해주세요.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error('SignUp failed:', error);
      toast.error('비밀번호 변경에 실패하였습니다. 정보를 확인해주세요.', {
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
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const validatePassword2 = (password, newPassword) => {
    return password !== newPassword
  };

  const navigate = useNavigate();

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
              type="password"
              style={{ width: "250px", height: "38px" }}
              placeholder='현재 비밀번호를 입력하세요'
              value={password}
              onChange={handleChangePW}
              required />
          </div>
              <div className='centered login-btn'>
            <input
              type="password"
              style={{ width: "250px", height: "38px" }}
              placeholder='새로운 비밀번호를 입력하세요'
              value={newPassword}
              onChange={handleChangeNewPW}
              required  />
          </div>
          <div className='centered login-btn'>
            <Button
              style={{ width: "250px" }}
              onClick={handleSubmit} >
              비밀번호 변경
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
        <br></br>
        <span className='explain'
          style={{ width: '350px' }}>
          {!isValidPW && 
          <p style={{
            color: 'red',
            fontSize: "14px" }} >
            비밀번호는 8글자 이상으로 설정해야 합니다.
          </p>}
          {!isValidNewPW && 
          <p style={{
            color: 'red',
            fontSize: "14px" }} >
            현재 비밀번호와 같은 비밀번호로 변경할 수 없습니다.
          </p>}
        </span>
      </div>
    </div>
  );
};

export default UpdatePW;