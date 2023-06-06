import "./nav.css"
import { useState, useEffect } from "react"
import NetflixLogo from "../../assets/netflix_transparent.png"
import Avatar from "../../assets/Netflix-avatar.png"
const Nav = () => {
    const [show, handleShow] = useState(false)
    const transitionNavbar = () => {
        window.scrollY > 100 ? handleShow(true) : handleShow(false)
    }

    useEffect(() => {
        // AddeventListner is going to run when the component mounts 
        window.addEventListener("scroll", transitionNavbar)

        // this is a cleanup function which runs after the coomponent unmounts 
        return () => window.removeEventListener("scroll", transitionNavbar)
    },[])
    return (
        <div className={`${show ? "nav__black" : ""} nav`}>
            <div className="nav__container">
                <img src={NetflixLogo} alt="logo"  className="nav__logo" />
                <img src={Avatar} alt="avatar" className="nav__avatar" />
            </div>
            
        </div>
    )
}

export default Nav