import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import themeSlice from './themeSlice'
import authSlice from './authSlice'
import authApi from './api/authApi'
import proPicSlice from './proPicSlice'
import addPostSlice from './addPostSlice'
const store =  configureStore({
   
    reducer:{
        proPic:proPicSlice,
        theme:themeSlice,
        auth:authSlice,
        addPost:addPostSlice,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
})
setupListeners(store.dispatch)
export default store