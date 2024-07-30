import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { Button } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import AlertModalModule from '../../modules/alertModalModule';
import { FaRegEdit } from "react-icons/fa";

const MainAccountInfo = () => {
    const navigate = useNavigate();
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleGuestLogin = async () => {
        try {
            const response = await instance.post('/auth/guest-login');
            if (response.status === 200) {
                setAlertMessage('게스트로 로그인 되었습니다.');
                setShowAlertModal(true);
                navigate('/monthlyBoard');
            }
        } catch (error) {
            console.error('게스트 로그인 실패:', error);
        }
    };
    const handleALertClick = () => {
        // deleteList(list);
        setShowAlertModal(false);
    };
    const handleLogin= () => {
        navigate('/login');
    };
    const handleSignUp = () => {
        navigate('/signUp');
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
                    <div className="button-container">
                        <div className='centered login-btn'>
                            <Button
                                style={{ width: "250px" }}
                                onClick={handleLogin}>
                                <MdEmail /> 이메일 로그인
                            </Button>
                        </div>
                        <div className='centered login-btn'>
                            <Button variant="outline-secondary" style={{ width: "250px" }}>
                                <a href="http://localhost:9099/oauth2/authorization/google" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <FcGoogle /> 구글 로그인
                                </a>
                            </Button>
                        </div>
                        <div className='centered login-btn'>
                            <Button
                                variant="outline-secondary"
                                style={{ width: "250px" }}
                                onClick={handleSignUp}>
                                <PiSignInBold /> 회원가입
                            </Button>
                        </div>
                        <div className='centered login-btn'>
                            <Button
                                variant="warning"
                                style={{ width: "250px",  }}
                                onClick={handleGuestLogin}>
                                <FaRegEdit /> 게스트 로그인
                            </Button>
                        </div>
                    </div>
            </div>

            <AlertModalModule
                show={showAlertModal}
                onHide={() => setShowAlertModal(false)}
                handleALertClick={handleALertClick}
                title={alertTitle}
                alert={alertMessage}
            />
        </div>
    );
};

export default MainAccountInfo;