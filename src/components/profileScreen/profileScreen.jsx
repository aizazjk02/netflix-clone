import { useEffect } from "react"
import "./profileScreen.css"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUser } from "../../redux/userSlice"
import Nav from "../nav/nav"
import Avatar from "../../assets/Netflix-avatar.png"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/userSlice"
import { signOutCurrentUser } from "../../firebase"

import Plans from "../plans/plans"
const ProfileScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(selectUser)


    const handleNavigation = () => {
        if (!user) navigate("/")
    }


    useEffect(() => {
        handleNavigation()
        // if (!user) navigate("/login")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleSignOut = async () => {
        await signOutCurrentUser()
        dispatch(logout())
        navigate("/login")
    }
    return (
        <>
            {
                user && (<div className="profileScreen">
                    <Nav />
                    <div className="profileScreen__body">
                        <h1>Edit Profile</h1>
                        <div className="profileScreen__info">
                            <img src={Avatar} alt="avatar" />
                            <div className="profileScreen__details">
                                <h2>{user.email}</h2>
                                <div className="profileScreen__plans">
                                    <p className="currentPlan">
                                        {user.subscription ? `Plans (Current Plan : ${user.subscription?.role})` : ""}
                                    </p>
                                    
                                    <div className="subscriptions">
                                        
                                       <Plans/>
                                        
                                    </div>
                                    <button className="profileScreen__signOut" onClick={handleSignOut}>Sign Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>

    )
}

export default ProfileScreen