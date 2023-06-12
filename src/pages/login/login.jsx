import "./login.css"
import { useEffect, useState } from "react"
import NetflixLogo from "../../assets/netflix_transparent.png"
import SignUp from "../../components/signUp/signUp"
import { useRef } from "react"
import { signUpUserWithEmailAndPassword } from "../../firebase"
import { useNavigate } from "react-router-dom"

import { selectUser } from "../../redux/userSlice"
import { useSelector } from "react-redux"
/**
 * TODO : Figure out a way to use srcset into background property
 * 
 * src="https://assets.nflxext.com/ffe/siteui/vlv3/73334647-ad51-42a9-b07b-93298cc2a8e1/2b0fca4f-c15c-4622-9efc-572c4a408c30/IN-en-20230605-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                srcset="https://assets.nflxext.com/ffe/siteui/vlv3/73334647-ad51-42a9-b07b-93298cc2a8e1/2b0fca4f-c15c-4622-9efc-572c4a408c30/IN-en-20230605-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/73334647-ad51-42a9-b07b-93298cc2a8e1/2b0fca4f-c15c-4622-9efc-572c4a408c30/IN-en-20230605-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/73334647-ad51-42a9-b07b-93298cc2a8e1/2b0fca4f-c15c-4622-9efc-572c4a408c30/IN-en-20230605-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
 */
const Login = () => {
    const user = useSelector(selectUser)
    useEffect(() => {
        if(user) navigate("/")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [signIn, setSignIn] = useState(false)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const navigate = useNavigate()
    const handleSignUp = async (e) => {
        e.preventDefault()
        await signUpUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)

    }

    
    return (
      
           <div className="login">
            <div className="login__background">
                <img src={NetflixLogo} alt="" className="login__logo" />
                <button className="login__btn" onClick={() => setSignIn(!signIn)}>
                    {signIn ? "Sign Up" : "Sign In"}
                </button>
        
                <div className="login__gradient" />
            </div>
            <div className="login__body">
                {
                    signIn ? (<SignUp />) : (<>
                        <h1>Unlimited films, TV shows and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <p>Ready to watch? Enter your email to create or restart your membership.</p>

                        <form className="login__form">

                            <input ref={emailRef} className="login__form__input" type="email" placeholder="Email Address" />
                            <input ref={passwordRef} className="login__form__input" type="password" placeholder="Password" />
                            <button className="login__form__btn" onClick={handleSignUp}>GET STARTED</button>

                        </form>
                    </>)
                }

            </div>
        </div>
    )
}

export default Login