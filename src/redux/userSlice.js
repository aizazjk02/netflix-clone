import { createSlice } from "@reduxjs/toolkit";
// import { signOutCurrentUser } from "../firebase";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user:null,
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload
        }, 
        logout: state => {
            // await signOutCurrentUser()
            state.user = null
        },
        addSubscription: (state, action) => {
            state.user = {...state.user, subscription: action.payload}
        }
    }
})

export const { login, logout, addSubscription } = userSlice.actions

export const selectUser = state => state.user.user
export const selectUserSubscription = state => state.user.user.subscription

export default userSlice.reducer