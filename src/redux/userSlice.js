import { createSlice } from "@reduxjs/toolkit";
import { signOutCurrentUser } from "../firebase";
export const userSlice = createSlice({
    name: "user",
    initialState: {
        user:null,
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload
        }, 
        logout: async state => {
            await signOutCurrentUser()
            state.user = null
        }
    }
})

export const { login, logout } = userSlice.actions

export const selectUser = state => state.user

export default userSlice.reducer