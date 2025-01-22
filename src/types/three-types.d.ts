import { ReactThreeFiber } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: ReactThreeFiber.Object3DNode<THREE.Object3D, THREE.Object3DEventMap>
      ambientLight: ReactThreeFiber.LightNode
      directionalLight: ReactThreeFiber.DirectionalLightNode
    }
  }
}
