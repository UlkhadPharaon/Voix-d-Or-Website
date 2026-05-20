import { useRef } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Vector2 } from 'three';

// Custom Shader Material
const LiquidGoldMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(),
    pointer: new THREE.Vector2(),
    color: new THREE.Color('#D4AF37'), // Base Gold
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float time;
    uniform vec2 pointer;

    // Perlin Noise function (simplified)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      
      // Liquid displacement logic
      float noise = snoise(uv * 3.0 + time * 0.2);
      
      // Mouse interaction displacement
      float dist = distance(uv, pointer);
      float interaction = smoothstep(0.5, 0.0, dist) * 0.3; // Ripple near mouse
      
      vec3 newPos = position + normal * (noise * 0.2 + interaction);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Basic lighting simulation
      vec3 lightPos = vec3(2.0, 2.0, 2.0);
      float diffuse = max(dot(vNormal, normalize(lightPos)), 0.0);
      
      // Specular shine (Liquid Gold look)
      vec3 viewDir = normalize(-vPosition);
      vec3 reflectDir = reflect(-normalize(lightPos), vNormal);
      float specular = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

      // Iridescence / Color shift based on normal
      vec3 finalColor = color * (diffuse + 0.2) + vec3(1.0) * specular;
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// Register the custom material as a JSX element
extend({ LiquidGoldMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements { }
  }
}

export const LiquidGold = () => {
  const materialRef = useRef<any>(null);

  useFrame(({ clock, pointer }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime();
      // Smooth pointer tracking (lerp could be added here for smoother feel)
      materialRef.current.pointer = new Vector2((pointer.x + 1) / 2, (pointer.y + 1) / 2);
    }
  });

  return (
    <mesh position={[0, 0, 0]} scale={1.5}>
      <sphereGeometry args={[1, 64, 64]} />
      <liquidGoldMaterial ref={materialRef} transparent />
    </mesh>
  );
};
