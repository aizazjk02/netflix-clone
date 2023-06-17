import HomeScreen from "./pages/homeScreen/homeScreen"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/login/login"
import { useEffect } from "react"
import { onAuthStateChangeListner, db } from "./firebase"
import { collection, query, getDocs } from "firebase/firestore"
import { login, logout, addSubscription } from "./redux/userSlice"
import { useDispatch } from "react-redux"
import ProfileScreen from "./components/profileScreen/profileScreen"

const App = () => {
    const dispatch = useDispatch()
    const fetchCurrentSubscription = async (uid) => {
        const q = query(collection(db, `customers/${uid}/subscriptions`))
        const snapShots = await getDocs(q)
        snapShots.forEach(snap => dispatch(addSubscription({
            role: snap?.data().items[0].price.product.name,
            current_period_end: snap?.data().current_period_end.seconds,
            current_period_start: snap?.data().current_period_start.seconds,
            status: snap?.data().status,
        }))
        )
    }
    useEffect(() => {


        const unsubscribe = onAuthStateChangeListner(userAuth => {

            if (userAuth) {

                dispatch(login({
                    uid: userAuth.uid,
                    email: userAuth.email,
                }))

                fetchCurrentSubscription(userAuth.uid)
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
            <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
        </div>
    )
}

export default App