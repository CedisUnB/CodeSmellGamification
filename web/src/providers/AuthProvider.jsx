import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [sessionId] = useState(() => {
        const stored = localStorage.getItem("sessionId");
        if (stored) return stored;
        const newSessionId = crypto.randomUUID();
        localStorage.setItem("sessionId", newSessionId);
        return newSessionId;
    });

    const updateToken = (newToken) => {
        console.log('updateToken:', newToken);
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, sessionId, updateToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;