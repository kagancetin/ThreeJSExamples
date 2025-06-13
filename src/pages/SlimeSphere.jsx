import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from "three"

function SlimeSphere() {
    const meshRef = useRef()
    const geometryRef = useRef()
    const { mouse, size, camera } = useThree()

    // Küre geometri bilgilerini sakla
    const originalPositions = useRef(null)

    // İlk render'da pozisyon verilerini sakla
    useEffect(() => {
        const geometry = geometryRef.current
        const positions = geometry.attributes.position.array
        originalPositions.current = Float32Array.from(positions)
    }, [])

    useFrame(() => {
        const mesh = meshRef.current
        const geometry = geometryRef.current
        if (!mesh || !geometry || !originalPositions.current) return

        const positions = geometry.attributes.position.array
        const orig = originalPositions.current

        // Ekrandaki fare pozisyonunu 3D koordinata çevir
        const mouseVec = new THREE.Vector3(mouse.x * 2, mouse.y * 2, 0.5)
        mouseVec.unproject(camera)

        const dir = mouseVec.sub(camera.position).normalize()
        const distance = -camera.position.z / dir.z
        const mousePos = camera.position.clone().add(dir.multiplyScalar(distance))

        const tempVertex = new THREE.Vector3()
        const tempMouse = mousePos

        for (let i = 0; i < positions.length; i += 3) {
            const origX = orig[i]
            const origY = orig[i + 1]
            const origZ = orig[i + 2]

            tempVertex.set(origX, origY, origZ)

            const dist = tempVertex.distanceTo(tempMouse)
            const influence = Math.max(0, 1 - dist / 2)

            const direction = tempVertex.clone().sub(tempMouse)
            if (direction.length() > 0) {
                direction.normalize()
            } else {
                direction.set(0, 0, 0)
            }

            const offset = direction.multiplyScalar(influence * 0.3)

            if (!isNaN(offset.x) && !isNaN(offset.y) && !isNaN(offset.z)) {
                positions[i] = THREE.MathUtils.lerp(positions[i], origX + offset.x, 0.2)
                positions[i + 1] = THREE.MathUtils.lerp(positions[i + 1], origY + offset.y, 0.2)
                positions[i + 2] = THREE.MathUtils.lerp(positions[i + 2], origZ + offset.z, 0.2)
            }
        }

        geometry.attributes.position.needsUpdate = true
        geometry.computeVertexNormals()
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry ref={geometryRef} args={[1, 64, 64]} />
            <meshStandardMaterial color="#00bcd4" roughness={0.3} metalness={0.1} />
        </mesh>
    )
}

const SlimeSpherePage = () => {
    return (
        <div className="p-4 space-y-4">
            <div className="rounded-xl shadow-md p-4 border bg-white">
                <h2 className="text-xl font-semibold mb-2">Slime Sphere</h2>
                <div className="h-[400px] w-full">
                    <Canvas camera={{ position: [0, 0, 5] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 2]} />
                        <SlimeSphere />
                    </Canvas>
                </div>
            </div>
            <div className="rounded-xl shadow-md p-4 border bg-white">
                <h3 className="text-lg font-medium mb-2">Nasıl çalışıyor?</h3>
                <p className="text-sm text-gray-700">
                    Fare pozisyonu world koordinatına çevrilerek her vertex'e olan uzaklık
                    hesaplanıyor. Yakın vertex'ler mouse’tan uzaklaşacak şekilde hareket ediyor,
                    sonra eski yerine dönüyor. Böylece sıvımsı (slime-like) bir efekt elde ediliyor.
                </p>
            </div>
        </div>
    )
}

export default SlimeSpherePage
