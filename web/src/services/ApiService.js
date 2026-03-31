import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ApiService = (token) => {
    if (token) {
        api.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
    }

    return {
        login: (user) => api.post('/login', user),
        register: (user) => api.post('/user', user),
        findUsers: () => api.get('/user'),
        findUserById: (id) => api.get(`/user/${id}`),
        findExercises: () => api.get('/exercise'),
    };
};