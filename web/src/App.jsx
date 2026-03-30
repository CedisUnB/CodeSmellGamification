import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Guia from './pages/Guia';
import FarejadorList from './pages/FarejadorList';
import Farejador from './pages/Farejador';

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/farejador" element={<FarejadorList />} />
                    <Route path="/farejador/:id" element={<Farejador />} />
                    <Route path="/guia" element={<Guia />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    {/* <Route path="/register" element={<Register />} /> */}
                </Routes>
            </Layout>
        </Router>
    );
};