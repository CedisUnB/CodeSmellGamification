import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api', // TODO: Verificar esse ||
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
        anonymousLogin: (sessionId) => api.post('/user/anonymous', sessionId),
        login: (user) => api.post('/user/login', user),
        register: (user) => api.post('/user/register', user),

        getMe: () => api.get('/user/me'),
        addCoins: (amount) => api.post('/user/coin', amount),

        getExercises: () => api.get('/exercise'),
        getExerciseById: (id) => api.get(`/exercise/${id}`),
        getTip: (id, tipNumber) => api.get(`/exercise/${id}/tip?tipNumber=${tipNumber}`),
        getStatistics: (id) => api.get(`/exercise/${id}/statistics`),

        makeAttempt: (id, attempt) => api.post(`/exercise/${id}/attempt`, attempt),

        getGuides: () => api.get('/guide'),
    };
};