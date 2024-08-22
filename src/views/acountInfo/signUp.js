import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { Button } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isValidPW, setIsValidPW] = useState(true);

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    if (!validatePassword(password)) {
      setIsValidPW(false);
      return;
    }
    try {
      const response = await instance.post('/auth/signup', {
        nickname,
        email,
        password
      }, {
        headers: {
          'Authorization': null // Authorization 헤더 제거
        }
      });
      if (response.status === 201) {

        toast.success(`회원가입되었습니다. 로그인해주세요!`, {
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
        toast.error('회원가입에 실패하였습니다. 정보를 확인해주세요.', {
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
      toast.error('회원가입에 실패하였습니다. 정보를 확인해주세요.', {
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
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePassword = (password) => {
    return password.length >= 8;
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  };
  const handleChangePW = (e) => {
    setPassword(e.target.value);
    setIsValidPW(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };
  const handleLogin = () => {
    navigate('/login');
  };
  const handlemainAccountInfo = () => {
    navigate('/mainAccountInfo');
  };
  return (
    <div className="contents">
      <div className="accountInfo-container">
        <div className="todolistMainTitle">
          Todo List
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="signUp-container" >
          <form onSubmit={handleSubmit}>
            <div className='centered login-btn'>
              <input
                type="text"
                style={{ width: "250px", height: "38px" }}
                placeholder='Nickname'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)} />
            </div>
            <div className='centered login-btn'>
              <input
                type="email"
                style={{ width: "250px", height: "38px" }}
                placeholder='Email'
                value={email}
                onChange={handleChange}
                required />
            </div>
            <div className='centered login-btn'>
              <input
                type="password"
                style={{ width: "250px", height: "38px" }}
                placeholder='Password'
                value={password}
                onChange={handleChangePW}
                required />
            </div>
          </form>
          <div className='centered login-btn'>
            <Button style={{ width: "250px" }} onClick={handleSubmit}>
              회원가입
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
                onClick={handlemainAccountInfo}>처음으로</span>
            </div>
          </div>
        </div>
        <br></br>
        <span className='explain'
          style={{ width: '350px' }}>
          {!isValid && 
          <p style={{
            color: 'red',
            fontSize: "14px" }} >
            유효한 이메일 주소를 입력하세요.
          </p>}
          {!isValidPW && 
          <p style={{
            color: 'red',
            fontSize: "14px" }} >
            비밀번호는 8글자 이상으로 설정해야 합니다.
          </p>}
        </span>
      </div>
    </div>
  );
};

export default SignUp;