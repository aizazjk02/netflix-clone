import HomeScreen from "./pages/homeScreen/homeScreen"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/login"
import { useEffect } from "react"
import { onAuthStateChangeListner } from "./firebase"
import { login, logout } from "./redux/userSlice"
import { useDispatch } from "react-redux"
const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChangeListner(userAuth => {
            if (userAuth) {
                dispatch(login({
                    uid: userAuth.uid,
                    email: userAuth.email,
                }))
            }

            else {
                dispatch(logout)
            }
        })
        return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="app">
            <Routes>

                <Route path="/" element={<HomeScreen />} />
                {

                }
                <Route path="/login" element={<Login />} />

            </Routes>
        </div>
    )
}

export default App