// import { createContext, useState, ReactNode } from "react";

// type UserData = {
//   id: string;
//   access: string;
// };

// type SignData = {
//   userData: UserData;
//   token: string;
// };

// type AuthContextType = {
//   userId: string | null;
//   token: string | null;
//   access: string | null;
//   sign: (data: SignData) => void;
//   logout: () => void;
// };

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// type Props = {
//   children: ReactNode;
// };

// const AuthProvider = ({ children }: Props) => {
//   const [userId, setUserId] = useState<string | null>(
//     localStorage.getItem("id")
//   );
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("token")
//   );
//   const [access, setAccess] = useState<string | null>(
//     localStorage.getItem("access")
//   );

//   const sign = (data: SignData) => {
//     setUserId(data.userData.id);
//     setToken(data.token);
//     setAccess(data.userData.access);

//     localStorage.setItem("id", data.userData.id);
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("access", data.userData.access);
//   };

//   const logout = () => {
//     setUserId(null);
//     setToken(null);
//     setAccess(null);

//     localStorage.removeItem("id");
//     localStorage.removeItem("token");
//     localStorage.removeItem("access");
//   };

//   return (
//     <AuthContext.Provider value={{ userId, token, access, sign, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;