import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-6">ThreeJS Examples</h1>
            <ul className="space-y-4">
                <li>
                    <Link to="/test" className="block p-4 bg-white rounded shadow hover:bg-blue-50">
                        Test
                    </Link>
                </li>
                <li>
                    <Link
                        to="/rotating-cube"
                        className="block p-4 bg-white rounded shadow hover:bg-blue-50"
                    >
                        Rotating Cube
                    </Link>
                </li>
                <li>
                    <Link
                        to="/sphere"
                        className="block p-4 bg-white rounded shadow hover:bg-blue-50"
                    >
                        Sphere Slime
                    </Link>
                </li>
                <li>
                    <Link
                        to="/indented-sphere"
                        className="block p-4 bg-white rounded shadow hover:bg-blue-50"
                    >
                        Indented Sphere
                    </Link>
                </li>
            </ul>
        </div>
    )
}
