/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'gold': {
                    50: '#FBF5B7',
                    100: '#F9F1A5',
                    200: '#F5E6A3', // Light Gold
                    300: '#F0DB5C',
                    400: '#D4AF37', // Classic Gold
                    500: '#D4AF37', // Base Gold
                    600: '#AA8C2C',
                    700: '#806921',
                    800: '#554616',
                    900: '#2B230B',
                },
                'vantablack': '#050505', // Deepest Black
                'metallic-dark': '#0A0A0A', // Metallic Surface
                'champagne-gold': '#D4AF37', // Primary Accent
                'champagne-gold-light': '#E5C560',
                'void-black': '#050505', // Reverted to Dark
                'charcoal': '#1A1A1A', // Kept for secondary darks
                'luxury-black': '#0A0A0A', // Surface color
                'pure-black': '#000000',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                monument: ['Monument Extended', 'sans-serif'], // Added Monument
                display: ['Space Grotesk', 'sans-serif'], // Added Space Grotesk
                satoshi: ['Satoshi', 'sans-serif'], // Added Satoshi
                extended: ['Syncopate', 'sans-serif'], // Added Syncopate
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%)',
                'metallic-gradient': 'linear-gradient(135deg, #121212 0%, #050505 100%)',
                'subtle-smoke': 'radial-gradient(circle at 50% 50%, rgba(20,20,20,0.8) 0%, rgba(5,5,5,1) 100%)',
                'faso-pattern': "repeating-linear-gradient(45deg, #0a0a0a 0px, #0a0a0a 10px, #0f0f0f 10px, #0f0f0f 20px)",
            },
            maxWidth: {
                container: '1280px',
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'shine': 'shine 3s linear infinite',
                'marquee': 'marquee var(--duration) linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slowZoom: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.1)' },
                },
                spinSlow: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                float: {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                    '100%': { transform: 'translateY(0px)' },
                },
                borderFlow: {
                    '0%': { backgroundPosition: '100% 0' },
                    '100%': { backgroundPosition: '-100% 0' },
                },
                shine: {
                    'to': { backgroundPosition: '200% center' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' },
                }
            }
        },
    },
    plugins: [],
};
