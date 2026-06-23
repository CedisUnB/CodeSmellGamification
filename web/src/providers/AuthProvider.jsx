import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const createSessionId = () => {
    const webCrypto = globalThis.crypto;

    if (webCrypto && webCrypto.randomUUID) {
        return webCrypto.randomUUID();
    }

    if (webCrypto && webCrypto.getRandomValues) {
        const bytes = webCrypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;

        const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
        return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
    }

    return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
};

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [sessionId] = useState(() => {
        const stored = localStorage.getItem("sessionId");
        if (stored) return stored;
        const newSessionId = createSessionId();
        localStorage.setItem("sessionId", newSessionId);
        return newSessionId;
    });

    const updateToken = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("token", newToken);
        } else {
            localStorage.removeItem("token");
        }
    };

    const logout = () => {
        updateToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, sessionId, updateToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
