import * as THREE from "three"
import React, { useEffect, useRef } from "react"

export default function Test() {
    const mountRef = useRef(null)

    useEffect(() => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )

        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)

        if (mountRef.current.firstChild) {
            mountRef.current.removeChild(mountRef.current.firstChild)
        }
        mountRef.current.appendChild(renderer.domElement)

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)
        scene.add(cube)

        const materialLine = new THREE.LineBasicMaterial({ color: 0x0000ff })
        const points = []
        points.push(new THREE.Vector3(-0.5, 0, 0))
        points.push(new THREE.Vector3(0, 0.5, 1))
        points.push(new THREE.Vector3(0.5, 0, 0.5))

        const geometryLine = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(geometryLine, materialLine)
        scene.add(line)

        camera.position.z = 5

        renderer.render(scene, camera)

        return () => {
            if (mountRef.current?.firstChild) {
                mountRef.current.removeChild(mountRef.current.firstChild)
            }
            renderer.dispose()
        }
    }, [])

    return (
        <div
            className="flex justify-center items-center border rounded-lg overflow-hidden bg-black"
            style={{ height: "450px" }}
            ref={mountRef}
        ></div>
    )
}
