import axios from 'axios';

//인스턴스 생성
const instance = axios.create({
  baseURL: 'http://localhost:9099',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  },
});
//요청 인텁셉터: token(JWT) 값을 가져와, Authorization 헤더에 Bearer 토큰값 형태로 추가
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
//응답 인터셉터
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      //무한 재시도 방지
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await instance.post('/auth/refresh-token', { refreshToken });
        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('token', newAccessToken);
          localStorage.setItem('refreshToken', refreshToken);
          return instance(originalRequest);
        }
      } catch (refreshError) {
        window.location.href = '/mainAccountInfo';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 