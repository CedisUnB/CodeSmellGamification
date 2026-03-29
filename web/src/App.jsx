import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Farejador from './pages/Farejador';
import Guia from './pages/Guia';

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/farejador" element={<Farejador />} />
                    <Route path="/guia" element={<Guia />} />
                </Routes>
            </Layout>
        </Router>
    );
};