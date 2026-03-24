import { BrowserRouter, Route } from 'react-router-dom';
// import { AuthContext } from "./contexts/AuthContext";
// import { useContext } from "react";

import Home from './pages/Home'


// const AuthLoggedUser = ({ component: Component }) => {
//   const { userId } = useContext(AuthContext);
//   return userId ? <Component /> : <Navigate to="/login" />
// }

// const AuthLogged = ({ component: Component }) => {
//   const { access } = useContext(AuthContext);
//   return access == 'ADMIN' ? <Component /> : <Navigate to="/login" />
// }


export default function App() {
  return (
    <BrowserRouter >
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/adoption" element={<AuthLoggedAdmin component={AdoptionList} />} /> */}
    </BrowserRouter>

  )
}