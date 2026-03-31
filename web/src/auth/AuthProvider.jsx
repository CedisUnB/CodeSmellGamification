import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";


const AuthProvider = ({children}) => {
    const [userId, setUserId] = useState(localStorage.getItem("id"));
    const [token, setToken] = useState(localStorage.getItem("token"));

    const sign = (data) => {
        setUserId(data.userData.id);
        setToken(data.token);
        localStorage.setItem("id", data.userData.id);
        localStorage.setItem("token", data.token);
    }

    const logout = () => {
        setUserId(null);
        setToken(null);
        localStorage.removeItem("id");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ userId, token, sign, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;