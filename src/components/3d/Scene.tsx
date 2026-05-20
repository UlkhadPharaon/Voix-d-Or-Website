import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { LiquidGold } from './LiquidGold';

export const Hero3D = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <LiquidGold />
                    </Float>

                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
};
