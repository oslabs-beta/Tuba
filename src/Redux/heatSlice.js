import { createSlice } from '@reduxjs/toolkit'
import { formatDateForInput } from '../Utilities/timeFunctions'

// const now = formatDateForInput(Date.now())
const now = Date.now()

const initialState = {
    selected: 1,
    start: formatDateForInput(946684800000),
    end: formatDateForInput(now)



}

export const heatSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {

        setStart: (state, action) => {
            state.start = action.payload
        },
        setEnd: (state, action) => {
            state.end = action.payload

        },
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
export const { setFilter, setStart, setEnd, setSelected } = heatSlice.actions

export default heatSlice.reducer