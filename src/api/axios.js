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

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken'); // refreshToken 가져오기
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }
                const refreshTokenResponse = await instance.get('/auth/refresh-token', {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
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