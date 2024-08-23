import { useGoogleLogin } from '@react-oauth/google';
import { useCallback } from "react";
import instance from '../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FcGoogle } from "react-icons/fc";
// 구글로그인 컴포넌트
const GoogleLoginComponent = ({ user, setUser }) => {
    const navigate = useNavigate();
    // 구글에서부터 사용자 정보 받아옴
    const fetchGoogleUserInfo = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching Google user info:', error);
            throw error;
        }
    };
    // 구글 로그인 실행
    const handleGoogleLogin = useCallback(async (credentialResponse) => {
        if (!credentialResponse || !credentialResponse.access_token) {
            console.error("Google 로그인 실패: access_token이 없습니다.");
            toast.error('Google 로그인 실패하였습니다. 다시 시도해주세요.', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        try {
            const userInfo = await fetchGoogleUserInfo(credentialResponse.access_token);
            const response = await instance.post('https://port-0-todo-list-back-lzy143lgf0f1c3f8.sel4.cloudtype.app/auth/google',
                { accessToken: credentialResponse.access_token }, // 요청 본문에 accessToken 포함
                {
                    headers: {
                        'Authorization': `Bearer ${credentialResponse.access_token}`
                    }
                }
            );
            if (response && response.data) {
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
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            console.error('Google 로그인 실패:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                toast.error(`Google 로그인 실패: ${error.response.data.message}`, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } console.error('Google 로그인 실패:', error);

            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                toast.error(`Google 로그인 실패: ${error.response.data.message}`, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }, [navigate, setUser]);
    // 로그인 시행
    const login = useGoogleLogin({
        onSuccess: handleGoogleLogin,
        onError: () => {
            toast.error('Google 로그인 실패하였습니다. 다시 시도해주세요.', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    });

    return (
        <Button
            variant="outline-secondary"
            style={{ width: "250px", textDecoration: 'none', color: 'inherit' }}
            onClick={() => login()} >
            <FcGoogle /> 구글 로그인
        </Button>
    );
}
export default GoogleLoginComponent;