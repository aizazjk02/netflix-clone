import HomeScreen from "./pages/homeScreen/homeScreen"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/login"
const App = () => {
    return (
        <div className="app">
            <Routes>
                
                <Route path="/" element={<HomeScreen />} />
                <Route path="/login" element={<Login />} />
                
            </Routes>
        </div>
    )
}

export default App