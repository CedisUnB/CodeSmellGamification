import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './components/Layout';
import GuiaList from './pages/Guia';
import GuiaDetail from './pages/Guia/[slug]';
import FarejadorList from './pages/Farejador';
import FarejadorDetail from './pages/Farejador/[id]';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { trackPageView } from './services/AnalyticsService';

function AnalyticsPageTracker() {
    const location = useLocation();
    const lastTrackedPath = useRef('');

    useEffect(() => {
        const pagePath = `${location.pathname}${location.search}${location.hash}`;

        if (pagePath === lastTrackedPath.current) {
            return;
        }

        lastTrackedPath.current = pagePath;
        trackPageView(pagePath);
    }, [location]);

    return null;
}

export default function App() {
    return (
        <Router>
            <AnalyticsPageTracker />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/farejador" element={<FarejadorList />} />
                    <Route path="/farejador/:id" element={<FarejadorDetail />} />
                    <Route path="/guia" element={<GuiaList />} />
                    <Route path="/guia/:slug" element={<GuiaDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </Router>
    );
};
