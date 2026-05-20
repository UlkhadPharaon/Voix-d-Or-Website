import { Object3DNode } from '@react-three/fiber';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            liquidGoldMaterial: Object3DNode<THREE.ShaderMaterial, typeof THREE.ShaderMaterial> & {
                transparent?: boolean;
                ref?: React.Ref<any>;
            };
        }
    }
}
