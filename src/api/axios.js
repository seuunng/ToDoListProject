import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://localhost:9099',
    withCredentials: true, // 세션 쿠키를 포함
    headers : {
        'Content-Type' : 'application/json'
    },
});
    // withCredentials: true // 모든 요청에 쿠키를 포함시킵니다.
    axios.interceptors.response.use(
        response => response,
        async error => {
          const originalRequest = error.config;
      
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const refreshTokenResponse = await instance.get('/auth/refresh-token', {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
                }
              });
              const { token } = refreshTokenResponse.data;
              localStorage.setItem('token', token);
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return instance(originalRequest);
            } catch (err) {
              console.error('Failed to refresh token', err);
              return Promise.reject(error);
            }
          }
          return Promise.reject(error);
        }
      );

export default instance; 