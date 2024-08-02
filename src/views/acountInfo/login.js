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

const Login = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/auth/login', {
                email,
                password
                // email: this.email,
                // password: this.password
            }, { withCredentials: true })

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setUser(data.user);
            setAlertMessage(`${user.nickname}님, 환영합니다!`);
            setShowAlertModal(true);
            console.log(`현재 로그인한 유저는 ${user.nickname} 입니다`);

            navigate('/monthlyBoard');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setAlertTitle('로그인 실패');
            setAlertMessage(error.response ? error.response.data.message  : '서버와의 연결이 원활하지 않습니다.');
            setShowAlertModal(true);
        }
    };
    // const checkSession = async () => {
    //     try {
    //         const response = await instance.post('/auth/login', { withCredentials: true });
    //         console.log('Session check response:', response.data);
    //         setUser(response.data.user);
    //     } catch (error) {
    //         console.error('Session check failed:', error.response ? error.response.data : error.message);
    //         setUser(null);
    //     }
    // };
    // useEffect(() => {
    //     checkSession();
    // }, []);
    const handleALertClick = () => {
        // deleteList(list);
        setShowAlertModal(true);
    };
    const handleFindPW = () => {
        navigate('/findPW');
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
                <div className="login-container">
                    <div className='centered login-btn'>
                        <input
                            type="email"
                            style={{ width: "250px", height: "38px" }}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='centered login-btn'>
                        <input
                            type="password"
                            style={{ width: "250px", height: "38px" }}
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='centered login-btn'>
                        <Button style={{ width: "250px" }} onClick={handleLogin}>
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
                                onClick={handleSignUp}>회원가입</span>
                        </div>
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

export default Login;