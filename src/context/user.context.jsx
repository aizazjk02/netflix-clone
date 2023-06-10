import { createContext, useEffect, useState } from "react";
import { onAuthStateChangeListner } from "../firebase";
export const UserContext = createContext({
    user: null,
    setUser: () => { }
})

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    useEffect(() => {
        const unsubscribe = onAuthStateChangeListner(userAuth => 
        {
            // console.log(userAuth)
            setUser(userAuth)
            }
        )
        return unsubscribe
    }, [user])

    const providerValues = {user}
    return (
        <UserContext.Provider value={providerValues}>{children}</UserContext.Provider>
    )
}