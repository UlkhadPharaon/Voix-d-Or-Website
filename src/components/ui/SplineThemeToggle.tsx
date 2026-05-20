import { Suspense, lazy, useRef } from 'react';
import { useTheme } from '@/components/ThemeContext';

const Spline = lazy(() => import('@splinetool/react-spline'));

/**
 * 3D Day/Night toggle button powered by Spline.
 * Listens for mouseDown events on the Spline scene to toggle the theme.
 * Compact size — designed to sit in the Navbar.
 */
export function SplineThemeToggle() {
    const { toggleTheme } = useTheme();
    const splineRef = useRef<any>(null);

    const handleLoad = (app: any) => {
        splineRef.current = app;

        // Listen for any mouse interaction on the Spline scene to toggle
        app.addEventListener('mouseDown', () => {
            toggleTheme();
        });
    };

    return (
        <div
            className="spline-theme-toggle"
            title="Toggle Day / Night"
        >
            <Suspense
                fallback={
                    <div className="spline-toggle-fallback">
                        <span className="spline-toggle-icon">◐</span>
                    </div>
                }
            >
                <Spline
                    scene="/assets/spline/theme_toogle_button.splinecode"
                    onLoad={handleLoad}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Suspense>
        </div>
    );
}
