import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-dark-900 text-white font-sans selection:bg-gold-500 selection:text-black">
        <Navbar />
        <main className="flex-grow">
            <AnimatePresence mode="wait">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Services />} />
                </Routes>
            </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
