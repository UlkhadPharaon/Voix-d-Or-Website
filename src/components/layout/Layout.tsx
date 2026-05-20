import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useTheme } from '@/components/ThemeContext';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const { isDark } = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div
            className="flex flex-col min-h-screen overflow-x-hidden"
            style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'background-color var(--theme-transition), color var(--theme-transition)',
            }}
        >
            <Navbar />
            <main className="flex-grow pt-24 relative z-0">
                {/* Global Background Elements */}
                <div className="fixed inset-0 pointer-events-none z-[-1]">
                    {/* Subtle ambient glow — changes with theme */}
                    <div
                        className="absolute top-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full opacity-50"
                        style={{
                            backgroundColor: isDark
                                ? 'rgba(212, 175, 55, 0.05)'
                                : 'rgba(212, 175, 55, 0.04)',
                            transition: 'background-color var(--theme-transition)',
                        }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] blur-[100px] rounded-full opacity-30"
                        style={{
                            backgroundColor: isDark
                                ? 'rgba(30, 58, 138, 0.10)'
                                : 'rgba(184, 148, 30, 0.03)',
                            transition: 'background-color var(--theme-transition)',
                        }}
                    />
                </div>
                {children}
            </main>
            <Footer />
        </div>
    );
};
