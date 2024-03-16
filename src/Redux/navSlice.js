import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tab: 'Dashboard',
    left: 'History',
    right: 'Heat Map'
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        changeTab: (state, action) => {
            switch (action.payload) {
                case 'Dashboard':
                    state.left = 'History';
                    state.right = 'Heat Map';
                    break;
                case 'Heat Map':
                    state.left = 'Dashboard';
                    state.right = 'Timeline';
                    break;
                case 'Timeline':
                    state.left = 'Heat Map';
                    state.right = 'History';
                    break;
                case 'History':
                    state.left = 'Timeline';
                    state.right = 'Dashboard';
                    break;
            }
            state.tab = action.payload

        },
    },
})

export const { changeTab } = navSlice.actions

export default navSlice.reducer