import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './slice'
import navReducer from './navSlice'
import timelineReducer from './timelineSlice'



export const store = configureStore({
    reducer: {
        nav: navReducer,
        timeline: timelineReducer
    },
})