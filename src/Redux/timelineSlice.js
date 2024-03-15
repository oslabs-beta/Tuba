import { createSlice } from '@reduxjs/toolkit'
import { msToString, stringToMs } from '../Utilities/timeFunctions'



// state.errorSlice.allErrors
const now = Date.now()

const initialState = {
    start: now - 1000,
    end: now,
    center: now - 500,
    elapsed: 1000,
    zoom: 500,
    nudge: 500,
    cascade: 1000,
    hatch25: now - 750,
    hatch75: now - 250,
    filtered: [],
    startInput: msToString(now - 1000).full,
    endInput: msToString(now).full,
    centerInput: msToString(now - 500).full,
    elapsedInput: 1000,
    zoomInput: 500,
    nudgeInput: 500,
    cascadeInput: 1000

}

const filter = (allErrors, start, end) => {
    const filteredErrors = allErrors.filter(error => {
        (error.err_time >= start && error.err_time <= end)
    })
    return filteredErrors
}

// const reset

export const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {
        nudgeRight: (state) => {

            state.nudge = Number(state.nudgeInput);

            state.start = stringToMs(new Date(state.start)) + state.nudge;
            state.hatch25 = stringToMs(new Date(state.hatch25)) + state.nudge;
            state.center = stringToMs(new Date(state.center)) + state.nudge;
            state.hatch75 = stringToMs(new Date(state.hatch75)) + state.nudge;
            state.end = stringToMs(new Date(state.end)) + state.nudge;

            // state.filtered = filter(allErrors, state.start, state.end)
        },
        nudgeLeft: (state) => {

            state.nudge = Number(state.nudgeInput);

            state.start = stringToMs(new Date(state.start)) - state.nudge;
            state.hatch25 = stringToMs(new Date(state.hatch25)) - state.nudge;
            state.center = stringToMs(new Date(state.center)) - state.nudge;
            state.hatch75 = stringToMs(new Date(state.hatch75)) - state.nudge;
            state.end = stringToMs(new Date(state.end)) - state.nudge;

            // state.filtered = filter(allErrors, state.start, state.end)


        },
        updateStart: (state, action) => {
            state.start = action.payload

            state.gap = state.end - state.start
        },
        updateEnd: (state, action) => {
            state.max = action.payload
            state.gap = state.end - state.start
        },
        setStart: (state, action) => {
            state.startInput = action.payload
        },
        setEnd: (state, action) => {
            state.endInput = action.payload
        },
        setCenter: (state, action) => {
            state.centerInput = action.payload
        },
        setElapsed: (state, action) => {
            state.elapsedInput = action.payload
        },
        setZoom: (state, action) => {
            state.zoomInput = action.payload
        },
        setNudge: (state, action) => {
            state.nudgeInput = action.payload
        },
        setCascade: (state, action) => {
            state.cascadeInput = action.payload
        },
    },
})

export const { nudgeRight, nudgeLeft, updateStart, updateEnd, setStart, setEnd, setCenter, setElapsed, setZoom, setNudge, setCascade } = timelineSlice.actions

export default timelineSlice.reducer