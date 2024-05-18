import { createSlice } from '@reduxjs/toolkit'
import { formatDateForInput } from '../Utilities/timeFunctions'

const now = Date.now()

const initialState = {
    selected: 1,
    start: formatDateForInput(1715817600000),
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
            state.selected = action.payload
        },
    },
})

export const { setFilter, setStart, setEnd, setSelected } = heatSlice.actions

export default heatSlice.reducer