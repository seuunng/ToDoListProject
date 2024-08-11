import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9099',
  withCredentials: true, // 세션 쿠키를 포함
  headers: {
    'Content-Type': 'application/json'
  },
});
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await instance.post('/auth/refresh-token', { refreshToken });
        if (response.status === 200) {
          const newAccessToken = response.data.accessToken;
          localStorage.setItem('token', newAccessToken);
          localStorage.setItem('refreshToken', refreshToken);
          // originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token request fails, redirect to /mainAccountInfo
        window.location.href = '/mainAccountInfo';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance; 