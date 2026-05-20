'use client';

import { Suspense, lazy, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
    /** URL to the Spline scene (.splinecode file) */
    scene: string;
    /** CSS class to apply to the Spline canvas */
    className?: string;
    /** Callback fired when the scene finishes loading */
    onLoad?: (app: any) => void;
}

/**
 * A lazy-loaded Spline scene component with a gold-themed loader.
 *
 * IMPORTANT: The parent container MUST have explicit width and height.
 * The Spline canvas expands to fill its parent — if the parent has
 * 0 height, you'll see nothing.
 */
export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = (app: any) => {
        setLoaded(true);
        onLoad?.(app);
    };

    return (
        <Suspense
            fallback={
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                    }}
                >
                    <GoldSpinner />
                </div>
            }
        >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                {!loaded && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 5,
                        }}
                    >
                        <GoldSpinner />
                    </div>
                )}
                <Spline
                    scene={scene}
                    className={className}
                    onLoad={handleLoad}
                    style={{
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>
        </Suspense>
    );
}

/** Gold-themed CSS spinner matching Voix d'Or aesthetic */
function GoldSpinner() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <span
                style={{
                    width: 40,
                    height: 40,
                    border: '2px solid rgba(212, 175, 55, 0.15)',
                    borderTopColor: '#D4AF37',
                    borderRadius: '50%',
                    animation: 'spline-spin 0.8s linear infinite',
                }}
            />
            <span
                style={{
                    fontSize: 10,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(212, 175, 55, 0.4)',
                    fontFamily: 'Monument Extended, sans-serif',
                }}
            >
                Chargement 3D
            </span>
        </div>
    );
}

/* Inject spinner keyframes once */
if (typeof document !== 'undefined') {
    const styleId = 'spline-scene-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes spline-spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}
