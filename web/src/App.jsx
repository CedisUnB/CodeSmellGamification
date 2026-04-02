import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import GuiaList from './pages/Guia';
import GuiaModule from './pages/Guia/[slug]';
import FarejadorList from './pages/FarejadorList';
import Farejador from './pages/Farejador';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/farejador" element={<FarejadorList />} />
                    <Route path="/farejador/:id" element={<Farejador />} />
                    <Route path="/guia" element={<GuiaList />} />
                    <Route path="/guia/:slug" element={<GuiaModule />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Layout>
        </Router>
    );
};