import React, { useEffect, useRef } from "react"
import * as THREE from "three"

export default function RotatingCube() {
    const mountRef = useRef(null)

    useEffect(() => {
        if (!mountRef.current) return

        const width = 400
        const height = 400

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({ antialias: true })

        renderer.setSize(width, height)

        if (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild)
        }

        mountRef.current.appendChild(renderer.domElement)

        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        camera.position.z = 3

        const animate = () => {
            requestAnimationFrame(animate)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            cube.rotation.z += 0.01
            renderer.render(scene, camera)
        }

        animate()

        return () => {
            if (mountRef.current?.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild)
            }
            renderer.dispose()
        }
    }, [])

    return (
        <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-gray-800">🌀 Rotating Cube</h2>

            <div
                className="flex justify-center items-center border rounded-lg overflow-hidden bg-black"
                style={{ height: "450px" }}
                ref={mountRef}
            ></div>

            <div className="text-sm text-gray-700">
                <p>
                    <strong>Bu örnek:</strong> Three.js kullanılarak oluşturulmuş dönen bir 3D küp
                    sahnesidir.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                        Bir <code>Scene</code>, <code>PerspectiveCamera</code> ve{" "}
                        <code>WebGLRenderer</code> oluşturuluyor.
                    </li>
                    <li>
                        Basit bir <code>BoxGeometry</code> ile yeşil bir küp sahneye ekleniyor.
                    </li>
                    <li>
                        <code>requestAnimationFrame</code> ile sürekli döndürülüp render ediliyor.
                    </li>
                    <li>
                        React bileşeni <code>useRef</code> ile DOM'a bağlanıyor ve{" "}
                        <code>useEffect</code> ile sahne kuruluyor.
                    </li>
                </ul>
            </div>
        </div>
    )
}
