import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { AwaConcierge } from './components/AwaConcierge';
import { ThemeProvider } from './components/ThemeContext';

// Lazy loading pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CinematicLaunch = lazy(() => import('./pages/CinematicLaunch'));
const NotFound = lazy(() => import('./pages/NotFound'));
const MusiqueDeFilm = lazy(() => import('./pages/MusiqueDeFilm'));
const Formation = lazy(() => import('./pages/Formation'));

// ScrollToTop component to handle route changes
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Loading fallback for lazy loaded components
const PageLoader = () => (
    <div className="w-full h-screen bg-vantablack" />
);

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reduced from 2.5s to 0.8s for better performance score 
        // while maintaining the cinematic entry.
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800); 
        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider>
            <Router>
                <SmoothScroll />
                <CustomCursor />
                <ScrollToTop />

                <AnimatePresence mode="wait">
                    {loading ? (
                        <Preloader key="preloader" onComplete={() => setLoading(false)} />
                    ) : (
                        <Layout>
                            <Suspense fallback={<PageLoader />}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/services" element={<Services />} />
                                    <Route path="/portfolio" element={<Portfolio />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/cinematic-launch" element={<CinematicLaunch />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/musique-de-film" element={<MusiqueDeFilm />} />
                                    <Route path="/formation" element={<Formation />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </Suspense>
                        </Layout>
                    )}
                </AnimatePresence>
                <AwaConcierge />
            </Router>
        </ThemeProvider>
    );
}

export default App;
