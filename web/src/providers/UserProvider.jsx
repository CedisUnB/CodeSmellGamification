import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ApiService } from '../services/ApiService';
import { UserContext } from '../contexts/UserContext';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { token, sessionId, updateToken } = useAuth();

    useEffect(() => {
        const { getMe, anonymousLogin } = ApiService(token);
        const loadUser = async () => {
            // Sem token, cria anônimo
            if (!token) {
                try {
                    const { data } = await anonymousLogin({ sessionId });
                    updateToken(data.token);
                } catch (error) {
                    console.error("Erro no login anônimo:", error);
                }
            }

            // Com token, busca usuário
            try {
                const { data } = await getMe();
                setUser(data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                updateToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [token, sessionId, updateToken]);

    const refreshUser = async () => {
        window.location.href = '/'; // TODO: VErificar essa solução depois
        const { getMe } = ApiService(token);
        try {
            const { data } = await getMe();
            setUser(data);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;