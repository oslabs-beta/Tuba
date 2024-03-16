import { createSlice } from '@reduxjs/toolkit'
import { msToString, stringToMs } from '../Utilities/timeFunctions'
import errors from '../Utilities/mockErrors'



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
    centerInput: msToString(now - 500).full,
    zoomInput: 500,
    nudgeInput: 500,
    cascadeInput: 1000,


}

const filter = (allErrors, start, end, cascade) => {
    console.log('filtering');



    const filteredErrors = allErrors.filter(error => {
        return (error.err_time >= start && error.err_time <= end)
    })

    let prev = -Infinity;

    const filterCascades = filteredErrors.map(error => {
        if (Number(error.err_time) - Number(prev.err_time) <= cascade) {
            const object = { ...error, cascade: prev.err_id };
            prev = object;
            return object
        } else {
            const object = { ...error, cascade: null };
            prev = object;
            return object
        }
    })
    return filterCascades
}





// const reset

export const timelineSlice = createSlice({
    name: 'timeline',
    initialState,
    reducers: {

        reCenterNodes: (state) => {
            state.cascade = Number(state.cascadeInput)
            state.center = stringToMs(state.centerInput);
            state.start = state.center - (state.elapsed / 2)
            state.end = state.center + (state.elapsed / 2)
            state.hatch25 = state.center - (state.elapsed / 4)
            state.hatch75 = state.center + (state.elapsed / 4)

            state.filtered = filter(errors, state.start, state.end, state.cascade)
        },
        nudgeRight: (state) => {

            state.cascade = Number(state.cascadeInput)

            state.nudge = Number(state.nudgeInput);

            state.start = stringToMs(new Date(state.start)) + state.nudge;
            state.hatch25 = stringToMs(new Date(state.hatch25)) + state.nudge;
            state.center = stringToMs(new Date(state.center)) + state.nudge;
            state.hatch75 = stringToMs(new Date(state.hatch75)) + state.nudge;
            state.end = stringToMs(new Date(state.end)) + state.nudge;

            state.filtered = filter(errors, state.start, state.end, state.cascade)


            // state.filtered = filter(allErrors, state.start, state.end)
        },
        nudgeLeft: (state) => {
            state.cascade = Number(state.cascadeInput)

            state.nudge = Number(state.nudgeInput);

            state.start = stringToMs(new Date(state.start)) - state.nudge;
            state.hatch25 = stringToMs(new Date(state.hatch25)) - state.nudge;
            state.center = stringToMs(new Date(state.center)) - state.nudge;
            state.hatch75 = stringToMs(new Date(state.hatch75)) - state.nudge;
            state.end = stringToMs(new Date(state.end)) - state.nudge;

            state.filtered = filter(errors, state.start, state.end, state.cascade)


            // state.filtered = filter(allErrors, state.start, state.end)


        },
        zoomOut: (state, action) => {

            state.cascade = Number(state.cascadeInput)

            state.zoom = Number(state.zoomInput);

            state.start = stringToMs(new Date(state.start)) - state.zoom;
            state.end = stringToMs(new Date(state.end)) + state.zoom;
            state.elapsed = state.end - state.start;
            const adjustment = state.elapsed / 4;

            state.hatch25 = stringToMs(new Date(state.center)) - adjustment;
            state.hatch75 = stringToMs(new Date(state.center)) + adjustment;

            state.filtered = filter(errors, state.start, state.end, state.cascade)


            // state.filtered = filter(allErrors, state.start, state.end)


        },
        zoomIn: (state, action) => {
            state.cascade = Number(state.cascadeInput)

            state.zoom = Number(state.zoomInput);

            state.start = stringToMs(new Date(state.start)) + state.zoom;
            state.end = stringToMs(new Date(state.end)) - state.zoom;
            state.elapsed = state.end - state.start;
            const adjustment = state.elapsed / 4;

            state.hatch25 = stringToMs(new Date(state.center)) - adjustment;
            state.hatch75 = stringToMs(new Date(state.center)) + adjustment;

            // state.filtered = filter(allErrors, state.start, state.end)

            state.filtered = filter(errors, state.start, state.end, state.cascade)


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

export const { reCenterNodes, nudgeRight, nudgeLeft, zoomOut, zoomIn, setCenter, setElapsed, setZoom, setNudge, setCascade } = timelineSlice.actions

export default timelineSlice.reducer