import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggleTheme: () => { },
    isDark: true,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Persist preference in localStorage (using new key to reset user preference to light)
        const saved = localStorage.getItem('voixdor-theme-v2');
        return (saved === 'dark' ? 'dark' : 'light') as Theme;
    });

    const isDark = theme === 'dark';

    const toggleTheme = useCallback(() => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    }, []);

    useEffect(() => {
        localStorage.setItem('voixdor-theme-v2', theme);
        const root = document.documentElement;

        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
            root.classList.remove('theme-light');
            root.classList.add('theme-dark');
        } else {
            root.setAttribute('data-theme', 'light');
            root.classList.remove('theme-dark');
            root.classList.add('theme-light');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
        </ThemeContext.Provider>
    );
};
