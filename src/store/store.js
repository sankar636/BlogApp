import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice.js'

const store = configureStore({
    // reducer:authReducer
    reducer: {
        auth: authReducer, // Assign the reducer to the `auth` key
    },
})

export default store;