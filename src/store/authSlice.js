import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
            // state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }   
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer


//Redux is a state management tool that helps you store, manage, and update your app’s global state in a predictable way.