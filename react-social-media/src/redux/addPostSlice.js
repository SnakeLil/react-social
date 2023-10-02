import { createSlice } from "@reduxjs/toolkit";
const addPostSlice = createSlice({
    name:'addPostSlice',
    initialState:'',
    reducers:{
        // 
        addPost: (state,payload) => {
            state = payload.payload
            return state;
        },



},
})
export const { addPost } = addPostSlice.actions
export default addPostSlice.reducer