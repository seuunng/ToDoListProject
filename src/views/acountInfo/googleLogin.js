import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSuccess = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      fetchUserDetails(token);
    } else {
      toast.error('로그인 토큰을 가져오지 못했습니다. 다시 시도해주세요.', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login');
    }
  }, [navigate, setUser]);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch('http://localhost:9099/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
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
      navigate('/login');
    }
  };

  return <div>로그인 중...</div>;
};

export default LoginSuccess;