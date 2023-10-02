import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name:'authSlice',
    initialState:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
    reducers:{
        // 
        setUser: (state,payload) => {
            state = payload.payload
            localStorage.setItem('user',JSON.stringify(state))   
        },
        getUser: (state) => {
            return state;
        },
        removeUser: (state) => {
            state.username = '';
            state.password = '';
            state.email = '';
            localStorage.removeItem('user');
        }

            //undefined
            
},
})
export const { getUser,setUser,removeUser } = authSlice.actions
export default authSlice.reducer