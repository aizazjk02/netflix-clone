import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import plansReducer from "./plansSlice"
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
export const store = configureStore({
  reducer: {
    user: userReducer,
    plans:plansReducer,
  },
});
