import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ApiService = (token) => {
    api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    return {
        login: (user) => api.post('/login', user),
        findUsers: () => api.get('/user'),
        findUserById: (id) => api.get(`/user/${id}`),
        findExercises: () => api.get('/exercise'),
    };
};