import React, { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import ProgressBar from './components/ProgressBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Distinction from './components/Armament';
import Offer from './components/Offer';
import TheVault from './components/TheVault';
import Testimonials from './components/Testimonials';
import AIAuditor from './components/AIAuditor';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom ease
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        // smoothTouch: false, // Default is false, usually good for mobile to keep native feel but can be enabled
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Custom Cursor Logic
    document.body.style.cursor = 'none'; 
    if (window.matchMedia('(pointer: coarse)').matches) {
       document.body.style.cursor = 'auto';
    }

    return () => {
      document.body.style.cursor = 'auto';
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#D4AF37] selection:text-black">
      <Preloader />
      <CustomCursor />
      <ProgressBar />
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Distinction />
        <Offer />
        <TheVault />
        <Testimonials />
        <AIAuditor />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;