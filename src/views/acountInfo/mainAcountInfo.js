import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { Button, Modal } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
    const handleGoogleLogin = () => {
        // if (window.google) {
        //     const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
            
        //     console.log("handleGoogleLogin 실행 clientId : ", clientId);
        //     console.log(window.google.accounts.id.renderButton);

        //     window.google.accounts.id.initialize({
        //         client_id: clientId,
        //         callback: (response) => {
        //             console.log("Callback 실행됨", response);
        //             handleLoginSuccess(response);
        //         },
        //     });
        //     console.log("Google API 초기화 완료");

        //     setShowGoogleModal(true);

        //     const button = document.getElementById("google-signin-button");
        //     if (button) {
        //         window.google.accounts.id.renderButton(
        //             button,
        //             { theme: "outline", size: "large" }
        //         );
        //         console.log("Google 버튼 렌더링 완료");
        //     } else {
        //         console.error("Google 버튼을 찾을 수 없습니다.");
        //     }
            
        //     window.google.accounts.id.prompt(); // 이 부분은 자동으로 팝업을 띄워주는 역할을 합니다.
        //     console.log("Google prompt 호출 완료");

        // } else {
        //     console.error('Google API가 로드되지 않았습니다.');
        // }
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
    };
    const handleLoginSuccess = (response) => {
        console.log("handleLoginSuccess 실행", response);
        // ID 토큰을 백엔드로 전송
        const idToken = response.credential;
        instance.post('http://localhost:9099/auth/google', { token: idToken })
        .then(response => {
            console.log(response.data);
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
            toast.success(`${user.nickname}님, 환영합니다!`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/monthlyBoard');
        })
        .catch(error => {
            console.error('Google 로그인 실패:', error);
            toast.error('Google 로그인 실패. 다시 시도해주세요.', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
};
    
    const handleLoginFailure = (response) => {
        console.error("handleLoginFailure", response);
        toast.error('Google 로그인 실패. 다시 시도해주세요.', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigate('/mainAccountInfo');
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
            console.log('Google API 스크립트 로드 완료');
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
                        {/* <Button 
                            variant="outline-secondary" 
                            style={{ width: "250px", textDecoration: 'none', color: 'inherit', width: "250px" }}
                            onClick={handleGoogleLogin}
                            >
                            <FcGoogle /> 구글 로그인   
                        </Button>  */}
                        {/* <div id="google-signin-button"></div> */}
                        
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                            <GoogleLogin   
                                onSuccess={response => {
                                    console.log("onSuccess 콜백 실행");
                                    handleLoginSuccess(response);
                                  }}
                                onFailure={(error) => {
                                    console.log("onError 콜백 실행");
                                    handleLoginFailure(error);
                                  }}
                                // useOneTap
                                // cookiePolicy={'single_host_origin'}
                                auto_select
                            />
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