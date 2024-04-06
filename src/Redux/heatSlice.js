import { createSlice } from '@reduxjs/toolkit'
// import { setSelected } from './timelineSlice'

const initialState = {
    selected: 1,
    
}

export const heatSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
         setSelected: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.selected = action.payload
        },
       
    },
})

// Action creators are generated for each case reducer function
export const { setSelected } = heatSlice.actions

export default heatSlice.reducer