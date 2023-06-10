import "./signUp.css"
import { useRef } from "react"
import { signInUserWithEmailAndPassword } from "../../firebase"
import { useNavigate } from "react-router-dom"
const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const navigate = useNavigate()
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const handleSignIn = async (e) => {
        e.preventDefault()
        const userAuth = await signInUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        console.log("🚀 ~ file: signUp.jsx:14 ~ handleSignIn ~ userAuth:", userAuth)
        if(userAuth) navigate("/")
    }
    return (
        <div className="signUp">
            <h2>Sign In</h2>
            <form className="signIn__form" onSubmit={handleSubmit}>
                <input ref={emailRef} className="signUp__form__input" type="email" placeholder="Email" />
                <input ref={passwordRef} className="signUp__form__input" type="password" placeholder="Password" />
                <button className="signUp__form__btn" type="submit" onClick={handleSignIn}>Sign In</button>
            </form>
            <h4 className="signUp__prompt">
                <span>New to Netflix?</span> <a href="/login"  className="signUp__link"> Sign Up Now.</a>
            </h4>
        </div>
    )
}

export default SignUp