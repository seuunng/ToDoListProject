import React, { useState, useEffect } from 'react';
import '../../styles/basicStyle.css';
import '../../styles/logout.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AlertModalModule from '../../modules/alertModalModule';

const Logout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeContainer, setActiveContainer] = useState('logout');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

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
    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await instance.post('/auth/login', {
    //             email,
    //             password
    //         });
    //         if (response.status === 200) {
    //             setAlertMessage(`${nickname}님, 환영합니다!`);
    //             setShowAlertModal(true);
    //             navigate('/monthlyBoard');
    //         }
    //     } catch (error) {
    //         console.error('Login failed:', error.response ? error.response.data : error.message);
    //         setAlertTitle('로그인 실패');
    //         setAlertMessage(error.response ? error.response.data : '서버와의 연결이 원활하지 않습니다.');
    //         setShowAlertModal(true);
    //     }
    // };

    // const handleSignUp = async () => {
    //     try {
    //         const response = await instance.post('/auth/signup', {
    //             nickname,
    //             email,
    //             password
    //         });
    //         if (response.status === 201) {
    //             setAlertTitle('회원가입 성공');
    //             setAlertMessage(`로그인 해주세요`);
    //             setShowAlertModal(true);
    //             showLoginContainer();
    //         } else {
    //             // 오류 처리
    //             console.error('회원가입 실패');
    //         }
    //     } catch (error) {
    //         console.error('회원가입 중 오류 발생:', error);
    //     }
    // };
    // const handleGuestLogin = async () => {
    //     try {
    //         const response = await instance.post('/auth/guest-login');
    //         if (response.status === 200) {
    //             setAlertMessage('게스트로 로그인 되었습니다.');
    //             setShowAlertModal(true);
    //             navigate('/monthlyBoard');
    //         }
    //     } catch (error) {
    //         console.error('게스트 로그인 실패:', error);
    //     }
    // };
    const handleALertClick = () => {
        // deleteList(list);
        setShowAlertModal(false);
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
                {/* {activeContainer === 'logout' && (
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
                                <a href="http://localhost:9099/oauth2/authorization/google" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <FcGoogle /> 구글 로그인
                                </a>
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
                        <div className='centered login-btn'>
                            <Button
                                variant="warning"
                                style={{ width: "250px",  }}
                                onClick={handleGuestLogin}>
                                <FaRegEdit /> 게스트 로그인
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
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  />
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
                            <Button style={{ width: "250px" }} onClick={handleSignUp}>
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
                )} */}
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

export default Logout;