// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRXMuMN9DMmjRE6NTy5UjuF4cWVQ1J_cw",
    authDomain: "netflix-clone-f0f4c.firebaseapp.com",
    projectId: "netflix-clone-f0f4c",
    storageBucket: "netflix-clone-f0f4c.appspot.com",
    messagingSenderId: "935410719612",
    appId: "1:935410719612:web:634ce8327c579c831e62f9"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth()


export const signUpUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    try {
        return await createUserWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
    }
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)

}
export const onAuthStateChangeListner = callback => onAuthStateChanged(auth, callback)