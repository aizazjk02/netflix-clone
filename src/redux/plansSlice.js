import { createSlice } from "@reduxjs/toolkit";

export const plansSlice = createSlice({
    name: "plans",
    initialState: {
        plans: []
    },
    
    reducers: {
        setPlans: state => {
            state.plans = [
                {
                    id:1,
                    name: "Basic",
                    quality: "720p",
                    price: 200,
                    isSubscribed: false,
                },
                {
                    id:2,
                    name: "Standard",
                    quality: "1080p",
                    price: 500,
                    isSubscribed: false,
                },
                {
                    id:3,
                    name: "Premium",
                    quality: "4k+HDR",
                    price: 650,
                    isSubscribed: false,
                },
            ]
        },
        subscribe: (state, action) => {
            state.plans = state.plans.map(plan => {
                if (plan.id === action.payload.id) return { ...plan, isSubscribed: true }
                else return plan
            })
        },
        unsubscribe: (state, action) => {
            state.plans = state.plans.map(plan => {
                if (plan.id === action.payload.id) return { ...plan, isSubscribed: false }
                else return plan
            })
        },

    }
},
    

)
export const {setPlans, subscribe, unsubscribe} = plansSlice.actions
export const selectPlans = state => state.plans.plans

export default plansSlice.reducer