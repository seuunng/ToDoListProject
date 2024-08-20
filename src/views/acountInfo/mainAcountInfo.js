import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { Button, Modal } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import GoogleLoginComponent from '../acountInfo/googleLogin';
import axios from '../../api/axios';

const MainAccountInfo = ({ user, setUser }) => {
    const navigate = useNavigate();
    
    const handleGuestLogin = async () => {
        try {
            const response = await instance.post('/auth/guest-login');
            const data = response.data;
            const token = response.data.token;
            localStorage.setItem('token', token);
            setUser(data.user);
            if (response.status === 200) {
                toast.success(`${data.user.nickname}님, 환영합니다!`, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/monthlyBoard');
            }
        } catch (error) {
            console.error('게스트 로그인 실패:', error);
            toast.error('게스트 로그인 실패. 다시 시도해주세요.', {
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

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            console.log('Google API 스크립트 로드 완료', script);
        };
        document.body.appendChild(script);
    }, []); 

    

    return (
        <div className="contents">

            <div className="accountInfo-container">
                <div className="button-container">
                    <div className="todolistMainTitle">
                    Todo List
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className='centered login-btn'>
                        <Button
                            style={{ width: "250px" }}
                            onClick={handleLogin}>
                            <MdEmail /> 이메일 로그인
                        </Button>
                    </div>
                    <div className='centered login-btn'>
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                            <GoogleLoginComponent   
                                setUserInfo={setUser}
                                setIsLogin={(isLogin) => console.log(isLogin)}
                                setUser={setUser}
                                user={user}
                            />
                             {/* <Button 
                                variant="outline-secondary" 
                                style={{ width: "250px", textDecoration: 'none', color: 'inherit' }}
                                onClick={() => login()}
                            >
                                <FcGoogle /> 구글 로그인   
                            </Button> */}
                        </GoogleOAuthProvider>
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
                            style={{ width: "250px", }}
                            onClick={handleGuestLogin}>
                            <FaRegEdit /> 게스트 로그인
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainAccountInfo;