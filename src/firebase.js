/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

// import { loadStripe } from "@stripe/stripe-js";
import {getFirestore, collection, query, where, getDoc, getDocs, doc, setDoc, addDoc, onSnapshot, deleteDoc} from "firebase/firestore"
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
// Your web app's Firebase configuration
import { useNavigate } from "react-router-dom";
import { getApp } from "firebase/app";
import { getStripePayments, getProducts, createCheckoutSession, getCurrentUserSubscription, getCurrentUserSubscriptions } from "@stripe/firestore-stripe-payments";
const firebaseConfig = {
    apiKey: "AIzaSyCRXMuMN9DMmjRE6NTy5UjuF4cWVQ1J_cw",
    authDomain: "netflix-clone-f0f4c.firebaseapp.com",
    projectId: "netflix-clone-f0f4c",
    storageBucket: "netflix-clone-f0f4c.appspot.com",
    messagingSenderId: "935410719612",
    appId: "1:935410719612:web:634ce8327c579c831e62f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)

export const signUpUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    try {
        return await createUserWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
        switch (error.code) {
            case "auth/email-already-in-use": alert("User already exists!")
                return 
            case "auth/weak-password": alert("Password should be at least 6 characters.")
                return
            default: alert("Something went wrong! please try again.")
                return
        }
    }
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    try {
        await signInWithEmailAndPassword(auth, email, password)
        
    } catch (error) {
        console.log(error.code)
        switch (error.code) {
            case "auth/wrong-password": alert("Invalid password!")
                return
            case "auth/user-not-found": alert("User does not exists!")
                return
            default: alert("something went wrong, please try again!")
                return
        }
    }

}

export const fetchProducts = async () => {
    const products = {}
    try {
        const q = query(collection(db, "products"), where("active", "==", true))

        const querySnapshots = await getDocs(q)
        
        querySnapshots.forEach(async (productDoc) => {
            products[productDoc.id] = productDoc.data()
            const priceQuery = query(collection(db, `products/${productDoc.id}/prices`))
            const priceSnapshot = await getDocs(priceQuery)
            priceSnapshot.forEach(priceDoc => {
                products[productDoc.id].prices = {
                    priceId: priceDoc.id,
                    priceData: priceDoc.data()
                }
            })
        })
        
    } catch (error) {
        console.log(error)
    }

    return products
}

export const onAuthStateChangeListner = callback => onAuthStateChanged(auth, callback)

export const signOutCurrentUser = async () => await signOut(auth)

const stripeApp = getApp()
const payments = getStripePayments(stripeApp, {
    productsCollection: "products",
    customersCollection:"customers",
})


export const getproducts = async () => await getProducts(payments, {
    includePrices: true,
    activeOnly:true,
})

export const handleSubscriptionCheckout = async (priceId, {...extraData}, navigate) => {
    try {
        const session = await createCheckoutSession(payments, {
            price: priceId,
            ...extraData
        })
        window.location.assign(session.url).then(() => {navigate("/profile") }, () => {navigate("/")})
        
    } catch (error) {
        
    }
}

// export const getCurrentUserSubscription = async (userId) => {
//     const collectonRef = collection(db, `customers\${userId}\subscriptions`)
//     const docSnapShots = await getDocs(collectonRef)
//     console.log(docSnapShots)
// }

export const fetchCurrentUserSubscription = async () => {
    const subscriptions = await getCurrentUserSubscriptions(payments)
    return subscriptions
}
// items/plans/price/name