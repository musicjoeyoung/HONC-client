import "./SpinningGoose.scss"

import { Canvas, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader' //this still works?
import { Suspense } from 'react'

const Model = () => {
    const fbx = useLoader(FBXLoader, '/models/goose.fbx')
    return (
        <primitive
            object={fbx}
            scale={0.01}
            rotation={[0, Math.PI, 0]}
        />
    )
}

const SpinningGoose = () => {
    return (
        <div className='spinning-goose-container'>
            <Canvas camera={{
                position: [0, 3, 15],
                fov: 40,
                near: 0.1,
                far: 2000
            }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={1.0} color="#ffffff" />
                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1.5}
                        color="#ffffff"
                    />
                    <pointLight
                        position={[-10, -10, -5]}
                        intensity={0.5}
                        color="#ffedcc"
                    />
                    <Environment preset="sunset" />
                    <Model />
                    <OrbitControls
                        autoRotate={true}
                        autoRotateSpeed={4}
                        minDistance={4}
                        maxDistance={30}
                        maxPolarAngle={Math.PI / 1.5}
                        target={[0, 0, 0]}
                        enableZoom={true}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default SpinningGoose