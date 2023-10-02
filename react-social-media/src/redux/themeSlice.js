import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
    name:'themeSlice',
    initialState:{
        theme:{
            dark:localStorage.getItem('dark')?JSON.parse(localStorage.getItem('dark')).theme.dark:false,
            light:localStorage.getItem('light')?JSON.parse(localStorage.getItem('dark')).theme.light:true,
        }
    },
    
    reducers:{
        // 变色
        setDark: (state) => {
            state.theme.dark = true
            state.theme.light = false
           localStorage.setItem('dark',JSON.stringify(state))
           localStorage.setItem('light',JSON.stringify(state))
           return state;

        },
        setLight: (state) => {
            state.theme.dark = false
            state.theme.light = true
            localStorage.setItem('dark',JSON.stringify(state))
            localStorage.setItem('light',JSON.stringify(state))
            return state;
        }

},
})
export const { setDark,setLight } = themeSlice.actions
export default themeSlice.reducer