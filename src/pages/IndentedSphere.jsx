import React, { useRef, useEffect } from "react"
import * as THREE from "three"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function IndentedWireSphere() {
    const geometryRef = useRef()

    useEffect(() => {
        const geometry = geometryRef.current
        const position = geometry.attributes.position

        for (let i = 0; i < position.count; i++) {
            const y = position.getY(i)
            const vertex = new THREE.Vector3()
            vertex.fromBufferAttribute(position, i)

            if (y > 0.8) {
                const depth = 1 * Math.sin(((Math.PI / 2) * (y - 0.8)) / 0.2)
                vertex.multiplyScalar(1 - depth)
                position.setXYZ(i, vertex.x, vertex.y, vertex.z)
            }
            if (y < -0.8) {
                const depth = 1 * Math.sin(((Math.PI / 2) * (y - 0.8)) / 0.2)
                vertex.multiplyScalar(1 + depth)
                position.setXYZ(i, vertex.x, vertex.y, vertex.z)
            }
        }

        position.needsUpdate = true
        geometry.computeVertexNormals()
    }, [])

    return (
        <mesh>
            <sphereGeometry ref={geometryRef} args={[1, 64, 64]} />
            <meshBasicMaterial color="#00ffcc" wireframe transparent opacity={0.6} />
        </mesh>
    )
}

function IndentedWireSphereScene() {
    return (
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />
            <IndentedWireSphere />
            <OrbitControls enablePan={false} />
        </Canvas>
    )
}
export default () => {
    return (
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">🌀 Rotating Cube</h2>

            <div
                className="flex justify-center items-center border rounded-lg overflow-hidden bg-black"
                style={{ height: "450px" }}
            >
                <IndentedWireSphereScene />
            </div>

            <div className="text-sm text-gray-700"></div>
        </div>
    )
}
