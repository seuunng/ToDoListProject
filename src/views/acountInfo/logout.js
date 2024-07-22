import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { Button } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate, useLocation } from 'react-router-dom';

const Logout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeContainer, setActiveContainer] = useState('logout');

    useEffect(() => {
        if (location.state && location.state.activeContainer) {
            setActiveContainer(location.state.activeContainer);
        }
    }, [location.state]);

    const showLoginContainer = () => {
        setActiveContainer('login');
        navigate('/logout', { state: { activeContainer: 'login' } });
    };

    const showSignUpContainer = () => {
        setActiveContainer('signUp');
        navigate('/logout', { state: { activeContainer: 'signUp' } });
    };

    const handleFindPW = () => {
        navigate('/findPW', { state: { activeContainer } });
    };

    return (
        <div className="contents">
            <div>
                <h4
                    className="list-title">
                    To-do List
                </h4>
            </div>
            <div className="accountInfo-container">
                {activeContainer === 'logout' && (
                    <div className="button-container">
                        <div className='centered login-btn'>
                            <Button
                                style={{ width: "250px" }}
                                onClick={showLoginContainer}>
                                <MdEmail /> 이메일 로그인
                            </Button>
                        </div>
                        <div className='centered login-btn'>
                            <Button variant="outline-secondary" style={{ width: "250px" }}>
                                <FcGoogle /> 구글 로그인
                            </Button>
                        </div>
                        <div className='centered login-btn'>
                            <Button
                                variant="outline-secondary"
                                style={{ width: "250px" }}
                                onClick={showSignUpContainer}>
                                <PiSignInBold /> 회원가입
                            </Button>
                        </div>
                    </div>
                )}
                {activeContainer === 'login' && (
                    <div className="login-container">
                        <div className='centered login-btn'>
                            <input
                                type="email"
                                style={{ width: "250px", height: "38px" }}
                                placeholder='Email' />
                        </div>
                        <div className='centered login-btn'>
                            <input
                                type="password"
                                style={{ width: "250px", height: "38px" }}
                                placeholder='Password' />
                        </div>
                        <div className='centered login-btn'>
                            <Button style={{ width: "250px" }}>
                                로그인
                            </Button>
                        </div>
                        <div className='centered login-btn'>
                            <div className='row'
                                style={{ width: "250px" }}>
                                <span className='col col-7 lefted'
                                    style={{
                                        color: "grey",
                                        cursor: "pointer"
                                    }}
                                    onClick={handleFindPW}>비밀번호 찾기</span>
                                <span className='col col-5 righted'
                                    style={{
                                        color: "grey",
                                        cursor: "pointer"
                                    }}
                                    onClick={showSignUpContainer}>회원가입</span>
                            </div>
                        </div>
                    </div>
                )}
                {activeContainer === 'signUp' && (
                    <div className="signUp-container">
                        <div className='centered login-btn'>
                            <input
                                type="text"
                                style={{ width: "250px", height: "38px" }}
                                placeholder='Nickname' />
                        </div>
                        <div className='centered login-btn'>
                            <input
                                type="email"
                                style={{ width: "250px", height: "38px" }}
                                placeholder='Email' />
                        </div>
                        <div className='centered login-btn'>
                            <input
                                type="password"
                                style={{ width: "250px", height: "38px" }}
                                placeholder='Password' />
                        </div>
                        <div className='centered login-btn'>
                            <Button style={{ width: "250px" }}>
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
                                    onClick={showLoginContainer}>로그인으로 돌아가기</span>
                                <span className='col col-5 righted'
                                    style={{
                                        color: "grey",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        paddingRight: 0
                                    }}
                                    onClick={showSignUpContainer}></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Logout;