import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: "",
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        },
    },
})

export const { setSearch } = historySlice.actions

export default historySlice.reducer