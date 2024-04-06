import { createSlice } from '@reduxjs/toolkit'
// import { setSelected } from './timelineSlice'

const initialState = {
    search: "",

}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.search = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setSearch } = historySlice.actions

export default historySlice.reducer