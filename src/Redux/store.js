import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './slice'
import navReducer from './navSlice'



export const store = configureStore({
    reducer: {
        nav: navReducer,
    },
})