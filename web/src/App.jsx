import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import GuiaList from './pages/Guia';
import GuiaDetail from './pages/Guia/[slug]';
import FarejadorList from './pages/Farejador';
import FarejadorDetail from './pages/Farejador/[id]';
import Register from './pages/Register';
import Login from './pages/Login';

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/farejador" element={<FarejadorList />} />
                    <Route path="/farejador/:id" element={<FarejadorDetail />} />
                    <Route path="/guia" element={<GuiaList />} />
                    <Route path="/guia/:slug" element={<GuiaDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        </Router>
    );
};