import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:3000'),
    headers: {
        'Content-Type': 'application/json',
    },
});

export const ApiService = (token) => {
    const authConfig = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

    return {
        anonymousLogin: (sessionId) => api.post('/user/anonymous', sessionId),
        login: (user) => api.post('/user/login', user),
        register: (user) => api.post('/user/register', user),

        getMe: () => api.get('/user/me', authConfig),
        addCoins: () => api.post('/user/coin', undefined, authConfig),

        getExercises: () => api.get('/exercise', authConfig),
        getExerciseById: (id) => api.get(`/exercise/${id}`, authConfig),
        getTip: (id, tipNumber) => api.get(`/exercise/${id}/tip?tipNumber=${tipNumber}`, authConfig),
        getStatistics: (id) => api.get(`/exercise/${id}/statistics`, authConfig),

        makeAttempt: (id, attempt) => api.post(`/exercise/${id}/attempt`, attempt, authConfig),
    };
};
