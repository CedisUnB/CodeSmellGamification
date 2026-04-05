import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/ApiService';
import { UserContext } from '../contexts/UserContext';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const { token, sessionId, updateToken } = useAuth();

    useEffect(() => {
        const { getMe, anonymousLogin } = ApiService(token);
        const loadUser = async () => {
            // Sem token, cria anônimo
            if (!token) {
                try {
                    const { data } = await anonymousLogin({ sessionId: sessionId });
                    updateToken(data.token);
                } catch (error) {
                    console.error("Erro no login anônimo:", error);
                } finally {
                    setLoading(false);
                }
                return;
            }

            // Com token, busca usuário
            try {
                const { data } = await getMe();
                setUser(data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                updateToken(null);
                setUser(null);
                window.location.reload();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [token, sessionId, updateToken]);

    const refreshUser = async () => {
        const { getMe } = ApiService(token);

        const { data } = await getMe();
        setUser(data);
    };

    return (
        <UserContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;