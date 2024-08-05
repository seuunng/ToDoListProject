import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../api/axios';

const LoginSuccess = ({ setUser, authCode, state }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    console.log("LoginSuccess useEffect 호출됨"); // 디버그 로그 추가
    console.log(`Code: ${code}, State: ${state}`); // 디버그 로그 추가

    if (code && state) {
      // OAuth2 인증 코드를 사용하여 액세스 토큰을 받아옵니다.
      fetchToken(code, state);
    } else {
      toast.error('로그인 코드나 상태를 가져오지 못했습니다. 다시 시도해주세요.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/mainAccountInfo');
    }
  }, [navigate, setUser]);

  const fetchToken = async (code, state) => {
    try {
      // console.log("fetchToken 호출됨"); // 디버그 로그 추가
      const response = await instance.post('http://localhost:9099/oauth2/token', {
        code, state
        });

        console.log("fetchToken 호출됨", response.data);

        if (response.status === 200) {
          const data = response.data;
          const token = data.id_token;

        localStorage.setItem('token', token);
        fetchUserDetails(token);
      } else {
        throw new Error('토큰을 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('토큰 가져오기 실패:', error);
      toast.error('토큰을 가져오지 못했습니다. 다시 시도해주세요.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/mainAccountInfo');
    }
  };
  const fetchUserDetails = async (token) => {
    try {
      console.log("Fetching user details with token: ", token);
      const response = await instance.get('http://localhost:9099/api/session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUser(response.data);
        toast.success(`${data.nickname}님, 환영합니다!`, {
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
        throw new Error('사용자 정보를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      toast.error('사용자 정보를 가져오지 못했습니다. 다시 시도해주세요.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/mainAccountInfo');
    }
  };
  useEffect(() => {
    fetchToken(authCode, state);
  }, [authCode, state]);
  return <div>로그인 중...</div>;
};

export default LoginSuccess;