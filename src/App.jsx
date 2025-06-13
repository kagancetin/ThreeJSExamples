import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import RotatingCube from "./pages/RotatingCube"
import SlimeSphere from "./pages/SlimeSphere"
import IndentedSphere from "./pages/IndentedSphere"
import Test from "./pages/Test"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rotating-cube" element={<RotatingCube />} />
                <Route path="/sphere" element={<SlimeSphere />} />
                <Route path="/indented-sphere" element={<IndentedSphere />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </Router>
    )
}
