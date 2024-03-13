import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    min: 5,
    max: 10,
    center: undefined,
    nudge: undefined,
    gap: undefined,
    filtered: []

}

export const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        updateMin: (state, action) => {
            state.min = action.payload
            state.gap = state.max - state.min
        },
        updateMax: (state, action) => {
            state.max = action.payload
            state.gap = state.max - state.min
        },
    },
})

export const { updateMin, updateMax } = timelineSlice.actions

export default timelineSlice.reducer