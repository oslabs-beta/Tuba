import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './slice'
import navReducer from './navSlice'
import timelineReducer from './timelineSlice'
import errorSlice from './errorSlice'
import heatSlice from './heatSlice'
import historySlice from './historySlice'



export const store = configureStore({
    reducer: {
        nav: navReducer,
        timeline: timelineReducer,
        errorSlice: errorSlice,
        heat: heatSlice,
        history: historySlice
    },
})