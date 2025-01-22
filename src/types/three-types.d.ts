import { ReactThreeFiber } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: ReactThreeFiber.Object3DNode<any, any>
      ambientLight: ReactThreeFiber.LightNode
      directionalLight: ReactThreeFiber.DirectionalLightNode
    }
  }
}
