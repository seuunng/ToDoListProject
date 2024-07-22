import React, { useState } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { Button } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiSignInBold } from "react-icons/pi";

const UpadatePW = () => {
    const [activeContainer, setActiveContainer] = useState('logout');

    const showLoginContainer = () => {
        setActiveContainer('login');
    };

    const showSignUpContainer = () => {
        setActiveContainer('signUp');
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
                        style={{width: "250px"}}
                        onClick={showLoginContainer}>
                            <MdEmail/> 이메일 로그인
                        </Button>
                    </div>
                    <div className='centered login-btn'>
                        <Button variant="outline-secondary" style={{width: "250px"}}>
                            <FcGoogle /> 구글 로그인
                        </Button>
                    </div>
                    <div className='centered login-btn'>
                        <Button 
                        variant="outline-secondary" 
                        style={{width: "250px"}}
                        onClick={showSignUpContainer}>
                            <PiSignInBold  /> 회원가입
                        </Button>
                    </div>
                </div> 
                )}
                {activeContainer === 'login' && (
                <div className="login-container">
                    <div className='centered login-btn'>
                        <input 
                            type="email" 
                            style={{width: "250px"}}
                            placeholder='Email'/>
                    </div>                    
                    <div className='centered login-btn'>
                        <input 
                            type="password" 
                            style={{width: "250px"}}
                            placeholder='Password'/>
                    </div>
                    <div className='centered login-btn'>
                        <Button style={{width: "250px"}}>
                            로그인
                        </Button>
                    </div>
                </div>
                )}
                {activeContainer === 'signUp' && (
                <div className="signUp-container">
                    <div className='centered login-btn'>
                        <input 
                            type="text" 
                            style={{width: "250px"}}
                            placeholder='Nickname'/>
                    </div>
                    <div className='centered login-btn'>
                        <input 
                            type="email" 
                            style={{width: "250px"}}
                            placeholder='Email'/>
                    </div>
                    <div className='centered login-btn'>
                        <input 
                            type="password" 
                            style={{width: "250px"}}
                            placeholder='Password'/>
                    </div>
                    <div className='centered login-btn'>
                        <Button style={{width: "250px"}}>
                            회원가입
                        </Button>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default UpadatePW;