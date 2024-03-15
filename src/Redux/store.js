import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './slice'
import navReducer from './navSlice'
import errorSlice from './errorSlice'



export const store = configureStore({
    reducer: {
        nav: navReducer,
        errorSlice: errorSlice
    },
})