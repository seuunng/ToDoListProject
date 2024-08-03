import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { Button } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import ToastModule from '../../modules/toastModule';
import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [showToast, setShowToast] = useState(false);
    // const [toastTitle, setToastTitle] = useState('');
    // const [toastSubTitle, setToastSubTitle] = useState('');
    // const [toastContent, setToastContent] = useState('');


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/auth/login', { email, password });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.token);
                setUser(data.user);
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
            console.error('Login failed:', error.response ? error.response.data : error.message);
            toast.error('아이디 혹은 비밀번호를 확인해주세요', {
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

    const handleFindPW = () => {
        navigate('/findPW');
    };
    const handleSignUp = () => {
        navigate('/signUp');
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
        </div>
    );
};

export default Login;